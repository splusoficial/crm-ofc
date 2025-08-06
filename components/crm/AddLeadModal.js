import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ReactInputMask from 'react-input-mask';
import { getStatusOptions } from '../../config/statusConfig';

const statusOptions = getStatusOptions();


// Função de formatação: recebe string só com números!
function formatBRL(value) {
  if (!value) return 'R$ 0,00';
  value = value.replace(/\D/g, '');
  if (!value) return 'R$ 0,00';
  value = (parseInt(value, 10) / 100).toFixed(2) + '';
  value = value.replace('.', ',');
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return 'R$ ' + value;
}

// Converte para float no submit (ex: "123456" => 1234.56)
function parseCentavosToFloat(str) {
  if (!str) return 0;
  return parseInt(str.replace(/\D/g, ''), 10) / 100;
}

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

    if (!user || !user.email) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    // Monta o array de atividades
    const activities = [
      {
        tipo: 'observacao_manual',
        usuario: user.name,
        data_hora: new Date().toISOString(),
        observacao: 'Lead criado manualmente no sistema'
      }
    ];

    // Se houver observação, adiciona como outra atividade
    if (form.notes && form.notes.trim().length > 0) {
      activities.push({
        tipo: 'observacao_manual',
        usuario: user.name,
        data_hora: new Date().toISOString(),
        observacao: form.notes.trim()
      });
    }

    try {
      // Monta o objeto para inserção
      const leadData = {
        ...form,
        owner_email: user.email,
        wh_id: user.wh_id || null,
        estimated_value: parseCentavosToFloat(form.estimated_value),
        activity_history: activities
      };

      // Não salva a propriedade notes diretamente no lead!
      delete leadData.notes;

      console.log('📝 Dados para inserção:', leadData);

      // Inserção no Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select();

      if (error) {
        console.error('❌ Erro do Supabase:', error);
        throw error;
      }

      if (onSubmit && data && data[0]) {
        onSubmit(data[0]);
      }

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
            <ReactInputMask
              mask="(99) 99999-9999"
              maskChar={null}
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              required
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  placeholder="(11) 99999-9999"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
                />
              )}
            </ReactInputMask>
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
              type="text"
              inputMode="numeric"
              value={formatBRL(form.estimated_value)}
              onChange={e => {
                const onlyNums = e.target.value.replace(/\D/g, '');
                setForm(prev => ({ ...prev, estimated_value: onlyNums }));
              }}
              placeholder="R$ 0,00"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#C2946D] focus:border-transparent"
              maxLength={15}
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
