import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// Defina as opções de status aqui
const statusOptions = [
  { value: 'new_conversation', label: 'Nova conversa' },
  { value: 'interested_lead', label: 'Interessado' },
  { value: 'appointment_scheduled', label: 'Agendou Consulta' },
  { value: 'appointment_attended', label: 'Compareceu Consulta' },
  { value: 'procedure_sold', label: 'Vendeu Procedimento' },
  { value: 'no_show', label: 'Não compareceu' },
  { value: 'lost', label: 'Perdido' }
];

export default function AddLeadModal({ isOpen, onClose, onSubmit }) {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    full_name: '',
    whatsapp: '',
    interest_procedure: '',
    estimated_value: '',
    notes: '',
    priority: 'medium',
    status: 'new_conversation',
    appointment_date: '',
    source: ''
  });

  // Carrega usuário do localStorage quando o modal abre
  useEffect(() => {
    if (isOpen) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log('👤 Usuário carregado do localStorage:', parsedUser);
        } catch (error) {
          console.error('❌ Erro ao parsear dados do usuário:', error);
        }
      }
    }
  }, [isOpen]);

  // Função para atualizar estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 DEBUG - verificando dados do usuário
    console.log('=== DEBUG AUTENTICAÇÃO CUSTOMIZADA ===');
    console.log('User from localStorage:', user);
    console.log('User email:', user?.email);
    console.log('User authenticated:', !!user?.email);

    if (!user || !user.email) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    try {
      // 📊 Monta o objeto para inserção
      const leadData = {
        ...form,
        owner_email: user.email,
        wh_id: user.wh_id || null,
        estimated_value: form.estimated_value ? parseFloat(form.estimated_value) : null,
        activity_history: [
          {
            tipo: 'observacao_manual',
            usuario: user.email,
            data_hora: new Date().toISOString(),
            observacao: 'Lead criado manualmente no sistema'
          }
        ]
      };

      console.log('📝 Dados para inserção:', leadData);

      // 🚀 Inserção no Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select(); // Importante: select() para retornar os dados inseridos

      if (error) {
        console.error('❌ Erro do Supabase:', error);
        throw error;
      }

      console.log('✅ Lead inserido com sucesso:', data);

      // Chama callback com o lead criado
      if (onSubmit && data && data[0]) {
        onSubmit(data[0]);
      }

      // Redireciona para /crm e força reload da página
      window.location.href = '/crm';

    } catch (error) {
      console.error('❌ Erro ao adicionar lead:', error);
      alert(`Erro ao adicionar lead: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-[0.7] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Adicionar Lead</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo *
            </label>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp *
            </label>
            <input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              required
              placeholder="(11) 99999-9999"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Procedimento de interesse
            </label>
            <input
              name="interest_procedure"
              value={form.interest_procedure}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor estimado
            </label>
            <input
              name="estimated_value"
              type="number"
              step="0.01"
              value={form.estimated_value}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
              >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data do agendamento
            </label>
            <input
              name="appointment_date"
              type="datetime-local"
              value={form.appointment_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Origem do lead
            </label>
            <input
              name="source"
              value={form.source}
              onChange={handleChange}
              placeholder="Ex: Instagram, Facebook, Indicação..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!user?.email}
              className="px-6 py-2 rounded-md bg-[#C2946D] text-white hover:bg-[#B08356] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Salvar Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}