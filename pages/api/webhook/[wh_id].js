// pages/api/webhook/[wh_id].js
import { createClient } from '@supabase/supabase-js';

// Inicializa Supabase com service role para bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Mapeia os status do agente para os status do sistema
const statusMap = {
  'nova_conversa': 'new_conversation',
  'lead_interessado': 'interested_lead',
  'agendado': 'scheduled',
  'cancelou': 'cancelled',
  'reagendou': 'rescheduled',
  'compareceu': 'attended',
  'vendeu_procedimento': 'sold_procedure',
  'relacionamento': 'relationship',
  // Fallbacks em inglês caso venham assim
  'new_conversation': 'new_conversation',
  'interested_lead': 'interested_lead',
  'scheduled': 'scheduled',
  'cancelled': 'cancelled',
  'rescheduled': 'rescheduled',
  'attended': 'attended',
  'sold_procedure': 'sold_procedure',
  'relationship': 'relationship'
};

function cleanWhatsApp(remoteJid) {
  // Remove @s.whatsapp.net, +55 e qualquer caracter não numérico
  let cleaned = remoteJid.replace('@s.whatsapp.net', '');
  cleaned = cleaned.replace(/\D/g, ''); // Remove tudo que não é dígito

  // Remove o 55 do início se tiver
  if (cleaned.startsWith('55') && cleaned.length > 11) {
    cleaned = cleaned.substring(2);
  }

  return cleaned;
}

export default async function handler(req, res) {
  // Apenas aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extrai o wh_id da URL
    const { wh_id } = req.query;

    if (!wh_id) {
      return res.status(400).json({ error: 'Missing wh_id parameter' });
    }

    // Log para debug
    console.log('Webhook received for wh_id:', wh_id);
    console.log('Payload:', JSON.stringify(req.body, null, 2));

    // Extrai dados do payload
    const { functionName, functionArguments } = req.body;

    if (!functionArguments?.remoteJid || !functionArguments?.pushName) {
      return res.status(400).json({
        error: 'Missing required fields: remoteJid and pushName'
      });
    }

    // 1. Busca o usuário pelo wh_id
    const { data: user, error: userError } = await supabase
      .from('user')
      .select('*')
      .eq('wh_id', wh_id)
      .single();

    if (userError || !user) {
      console.error('User not found:', userError);
      return res.status(404).json({
        error: 'User not found with this wh_id'
      });
    }

    // 2. Prepara os dados do lead
    const whatsapp = cleanWhatsApp(functionArguments.remoteJid);
    const leadStatus = statusMap[functionArguments.status] || 'new_conversation';

    // 3. Verifica se o lead já existe
    const { data: existingLead, error: searchError } = await supabase
      .from('leads')
      .select('*')
      .eq('whatsapp', whatsapp)
      .eq('owner_email', user.email)
      .single();

    let result;

    if (existingLead) {
      // Lead existe - atualizar apenas o status
      console.log('Lead exists, updating status to:', leadStatus);

      // Prepara histórico de atividades
      const newActivity = {
        tipo: 'mudanca_status',
        data_hora: new Date().toISOString(),
        status_anterior: existingLead.status,
        status_novo: leadStatus,
        usuario: 'IA'
      };

      const updatedHistory = [
        ...(existingLead.activity_history || []),
        newActivity
      ];

      // Atualiza o lead
      const { data: updatedLead, error: updateError } = await supabase
        .from('leads')
        .update({
          status: leadStatus,
          activity_history: updatedHistory,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingLead.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      result = {
        action: 'updated',
        lead: updatedLead
      };

    } else {
      // Lead não existe - criar novo
      console.log('Creating new lead');

      const newLead = {
        full_name: functionArguments.pushName,
        whatsapp: whatsapp,
        owner_email: user.email,
        wh_id: wh_id,
        status: 'new_conversation', // Sempre começa aqui
        priority: 'medium',
        interest_procedure: functionArguments.interest_procedure || null,
        estimated_value: functionArguments.estimated_value || 0,
        source: functionArguments.source || 'WhatsApp',
        notes: functionArguments.observations || null,
        activity_history: []  // Começa vazio, sem nenhuma atividade
      };

      const { data: createdLead, error: createError } = await supabase
        .from('leads')
        .insert([newLead])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      result = {
        action: 'created',
        lead: createdLead
      };
    }

    // Retorna sucesso
    return res.status(200).json({
      success: true,
      ...result,
      message: `Lead ${result.action} successfully`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}