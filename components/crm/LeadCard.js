import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import PriorityBadge from './PriorityBadge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function LeadCard({
  lead,
  onClick,
  isSelected,
  onSelect,
  isDragging,
  onDragStart,
  onDragEnd
}) {
  console.log('LeadCard recebeu lead:', lead);

  const leadName = lead?.name || lead?.nome || lead?.client_name || lead?.contact_name || 'Sem nome';
  console.log('Nome processado:', leadName);

  const safeNome = lead?.nome || 'Sem nome';
  const safeWhatsapp = lead?.whatsapp || '---';
  const safeProcedimento = lead?.procedimento_interesse || null;
  const safeValor = typeof lead?.estimated_value === 'number' ? lead.estimated_value : null;

  const handleDragStart = (e) => {
    if (onDragStart) {
      onDragStart(e, lead);
    }
  };

  const handleClick = (e) => {
    // Evita conflito entre drag e click
    if (!isDragging && onClick) {
      onClick(lead);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-pointer hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
          {leadName}
        </h3>
        {/* Descomente se tiver PriorityBadge */}
        {/* <PriorityBadge priority={lead.priority} /> */}
      </div>

      {/* WhatsApp */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Phone className="w-4 h-4" />
        <span className="text-gray-400">{safeWhatsapp}</span>
      </div>

      {/* Último contato */}
      {lead.data_ultimo_contato && (
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <MessageCircle className="w-4 h-4" />
          <span className="text-gray-400 font-medium transition-colors">
            {format(new Date(lead.data_ultimo_contato), "dd 'de' MMM", {
              locale: ptBR
            })}
          </span>
        </div>
      )}

      {/* Procedimento */}
      {safeProcedimento && (
        <div className="space-y-1 mb-3">
          <p className="text-sm font-medium text-gray-700">{safeProcedimento}</p>
          {safeValor !== null && (
            <p className="text-sm font-semibold" style={{ color: '#428627' }}>
              R${' '}
              {safeValor.toLocaleString('pt-BR', {
                minimumFractionDigits: 2
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}