// pages/api/magic-login.js

import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Função para aguardar um tempo específico
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(req, res) {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ error: 'Token ausente' });
    }

    // Descriptografa o token JWT
    let userData;
    try {
      userData = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    const { email, name, wh_id } = userData;

    console.log('[magic-login] Processando:', { email, name, wh_id });

    // OBTER O DOMÍNIO ATUAL DINAMICAMENTE
    const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http');
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    
    console.log('[magic-login] URL base detectada:', baseUrl);

    // 1. Verifica se usuário já existe na tabela
    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from('user')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (lookupError) throw lookupError;

    let authUserId;
    let isNewUser = false;

    // 2. Se não existe, cria usuário no Auth E na tabela
    if (!existingUser) {
      console.log('[magic-login] Criando usuário no Auth...');
      isNewUser = true;
      
      // PRIMEIRO: Cria no Auth do Supabase
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { name, wh_id }
      });

      if (authError) {
        console.error('[magic-login] Erro ao criar no Auth:', authError);
        throw authError;
      }

      authUserId = authUser.user.id;
      console.log('[magic-login] Usuário criado no Auth com ID:', authUserId);

      // SEGUNDO: Insere na tabela user com o ID do Auth
      const { error: insertError } = await supabaseAdmin
        .from('user')
        .insert({ 
          id: authUserId, 
          email, 
          name, 
          wh_id 
        });

      if (insertError) {
        console.error('[magic-login] Erro ao inserir na tabela:', insertError);
        throw insertError;
      }

      console.log('[magic-login] Usuário criado com sucesso nos dois lugares!');
      
      // AGUARDA 3 SEGUNDOS para o Supabase sincronizar os dados
      console.log('[magic-login] Aguardando sincronização do Supabase (3s)...');
      await sleep(3000);
      
    } else {
      console.log('[magic-login] Usuário já existe na tabela');
      authUserId = existingUser.id;
    }

    // 3. MÉTODO SIMPLIFICADO - Redireciona usando URL dinâmica
    if (isNewUser) {
      // Para usuários novos, usa página de loading que aguarda e faz login
      console.log('[magic-login] Redirecionando usuário novo para página de loading...');
      return res.redirect(`${baseUrl}/auth/loading?email=${encodeURIComponent(email)}&new_user=true`);
    } else {
      // Para usuários existentes, redireciona direto
      console.log('[magic-login] Redirecionando usuário existente direto para CRM...');
      return res.redirect(`${baseUrl}/crm?magic_login=${encodeURIComponent(email)}`);
    }

  } catch (err) {
    console.error('[magic-login] Erro geral:', err);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: err.message 
    });
  }
}
