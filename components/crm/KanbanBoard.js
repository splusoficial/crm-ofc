import React, { useState } from 'react';
import { Sparkles, Users, DollarSign, TrendingUp } from 'lucide-react';
import LeadCard from './LeadCard';

export default function KanbanBoard({
  leads,
  filteredLeads,
  onLeadClick,
  selectedLeads,
  onSelectLead,
  onMoveLeads // Esta função deve vir do componente pai
}) {
  const [draggedLead, setDraggedLead] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    { id: 'new_conversation', title: 'Nova Conversa', isAI: true },
    { id: 'interested_lead', title: 'Lead Interessado', isAI: true },
    { id: 'scheduled', title: 'Agendado', isAI: true },
    { id: 'cancelled', title: 'Cancelou', isAI: true },
    { id: 'rescheduled', title: 'Reagendou', isAI: true },
    { id: 'attended', title: 'Compareceu', isAI: false },
    { id: 'sold_procedure', title: 'Vendeu Procedimento', isAI: false },
    { id: 'relationship', title: 'Relacionamento', isAI: false }
  ];

  const totalLeadsInSystem = leads.length;

  const unfilteredLeadsByStatus = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const totalLeadsExcludingCancelled = totalLeadsInSystem - (unfilteredLeadsByStatus['cancelled'] || 0);

  // Função simplificada - só passa os dados para o componente pai
  const handleDragStart = (e, lead) => {
    console.log('Drag iniciado:', lead);
    setDraggedLead(lead);
    e.dataTransfer.setData('text/plain', JSON.stringify(lead));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    // Limpa o estado quando termina o drag
    setDraggedLead(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Só remove o feedback se realmente saiu da coluna
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    
    try {
      const leadData = JSON.parse(e.dataTransfer.getData('text/plain'));
      console.log('Drop do lead:', leadData, 'para status:', newStatus);
      
      // Limpa os estados de drag
      setDraggedLead(null);
      setDragOverColumn(null);
      
      if (leadData.status === newStatus) {
        console.log('Lead já está neste status');
        return;
      }

      // CHAMA A FUNÇÃO DO COMPONENTE PAI
      if (onMoveLeads) {
        await onMoveLeads(leadData, newStatus);
        console.log('Lead movido com sucesso via onMoveLeads');
      } else {
        console.error('onMoveLeads não foi fornecida como prop');
      }
      
    } catch (error) {
      console.error('Erro no drop:', error);
      // Limpa os estados mesmo em caso de erro
      setDraggedLead(null);
      setDragOverColumn(null);
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {columns.map((column, index) => {
          const currentColumnLeads = filteredLeads.filter((lead) => lead.status === column.id);
          const totalValue = currentColumnLeads.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);
          
          let conversionRate = 0;
          if (totalLeadsInSystem > 0) {
            if (column.id === 'cancelled') {
              conversionRate = Math.round(((unfilteredLeadsByStatus['cancelled'] || 0) / totalLeadsInSystem) * 100);
            } else {
              const leadsInRelevantColumns = columns
                .slice(index)
                .filter(col => col.id !== 'cancelled')
                .reduce((sum, col) => sum + (unfilteredLeadsByStatus[col.id] || 0), 0);
              
              if (totalLeadsExcludingCancelled > 0) {
                conversionRate = Math.round((leadsInRelevantColumns / totalLeadsExcludingCancelled) * 100);
              }
            }
          }

          const isDragOver = dragOverColumn === column.id;

          return (
            <React.Fragment key={column.id}>
              <div
                className={`flex-shrink-0 w-80 bg-gray-50 rounded-xl border-2 transition-all duration-200 ${
                  isDragOver ? 'shadow-lg border-[#E6C39C]' : 'border-transparent'
                }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="bg-white p-4 rounded-t-xl border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                    {column.isAI ? (
                      <span className="px-2 py-1 text-xs font-medium bg-white text-black rounded-full border border-gray-500">
                        IA
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-white text-black rounded-full border border-black">
                        Manual
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {currentColumnLeads.length}
                    </span>
                    <span className="flex items-center gap-1">
                    {
                      totalValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 0
                      })
                    }
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {conversionRate}%
                    </span>
                  </div>
                </div>

                {/* Column Content */}
                <div className="bg-[#f5f5f5] p-4 space-y-3 min-h-[400px] rounded-b-xl">
                  {currentColumnLeads.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm">Nenhum lead nesta etapa</p>
                    </div>
                  ) : (
                    currentColumnLeads.map((lead) => (
                      // REMOVIDO O WRAPPER DIV COM DRAGGABLE - AGORA SÓ O LEADCARD É DRAGGABLE
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onClick={onLeadClick}
                        isSelected={selectedLeads.includes(lead.id)}
                        onSelect={onSelectLead}
                        isDragging={draggedLead?.id === lead.id}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    ))
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Warning */}
      <div className="lg:hidden mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700 text-center">
          💡 Para melhor experiência, visualize no computador
        </p>
      </div>
    </div>
  );
}