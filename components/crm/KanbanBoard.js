import React, { useState } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import LeadCard from './LeadCard';
import ManualMoveInfoModal from './ManualMoveInfoModal';
import StatusExplanationModal from './StatusExplanationModal';
import { getAllStatuses } from '@/config/statusConfig';

export default function KanbanBoard({
  leads,
  filteredLeads,
  onLeadClick,
  selectedLeads,
  onSelectLead,
  onMoveLeads,
  searchTerm = '',
  priorityFilter = ''
}) {
  const [draggedLead, setDraggedLead] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showManualMoveModal, setShowManualMoveModal] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const handleHeaderClick = (column) => {
    setSelectedColumn(column);
    setShowExplanationModal(true);
  };

  const columns = getAllStatuses();

  // Dados básicos para cálculo das métricas
  const totalLeadsInSystem = leads.length;

  // Leads agrupados por status (para cálculo das métricas por etapa)
  const unfilteredLeadsByStatus = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const totalLeadsExcludingCancelled = totalLeadsInSystem - (unfilteredLeadsByStatus['cancelled'] || 0);

  // DRAG
  const handleDragStart = (e, lead) => {
    setDraggedLead(lead);
    e.dataTransfer.setData('text/plain', JSON.stringify(lead));
    e.dataTransfer.effectAllowed = 'move';

    const dismissed = localStorage.getItem('crm_manual_move_info_dismissed');
    if (!dismissed) setShowManualMoveModal(true);
  };

  const handleDragEnd = () => {
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
      setDraggedLead(null);
      setDragOverColumn(null);
      if (leadData.status === newStatus) return;
      if (onMoveLeads) await onMoveLeads(leadData, newStatus);
    } catch {
      setDraggedLead(null);
      setDragOverColumn(null);
    }
  };

  // Gradiente da barra superior
  const barColors = { ai: '#e7c39c', manual: '#c1c1c1ff' };
  const dividerColor = '#fbfbfb';
  const totalColumns = columns.length;
  const divisionPercent = 0.6;
  let gradientStops = '';
  for (let idx = 0; idx < totalColumns; idx++) {
    const col = columns[idx];
    const nextCol = columns[idx + 1];
    const start = (idx / totalColumns) * 100;
    const end = ((idx + 1) / totalColumns) * 100;
    if (nextCol && col.isAI !== nextCol.isAI) {
      const dividerStart = end - (divisionPercent / 2);
      const dividerEnd = end + (divisionPercent / 2);
      gradientStops += `${barColors[col.isAI ? 'ai' : 'manual']} ${start}%, ${barColors[col.isAI ? 'ai' : 'manual']} ${dividerStart}%, `;
      gradientStops += `${dividerColor} ${dividerStart}%, ${dividerColor} ${dividerEnd}%, `;
    } else {
      gradientStops += `${barColors[col.isAI ? 'ai' : 'manual']} ${start}%, ${barColors[col.isAI ? 'ai' : 'manual']} ${end}%, `;
    }
  }
  gradientStops = gradientStops.slice(0, -2);
  const progressBarStyle = { background: `linear-gradient(to right, ${gradientStops})` };

  // CORREÇÃO: Decide o array de leads de acordo com search/filter
  const hasActiveSearch = !!searchTerm && searchTerm.length > 0;
  const hasActivePriorityFilter = !!priorityFilter && priorityFilter !== ''; // Corrigido: '' ao invés de 'all'
  const leadsToUse = hasActiveSearch || hasActivePriorityFilter ? filteredLeads : leads;

  return (
    <div className="overflow-x-auto pb-4">
      <div className="hidden md:block mb-2">
        <div
          className="h-[3px] min-w-max rounded-full"
          style={progressBarStyle}
        >
          <div className="flex gap-4 min-w-max invisible">
            {columns.map((column) => (
              <div key={column.id} className="w-80"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 min-w-max">
        {columns.map((column, index) => {
          // Leads daquela coluna, para filtro/contagem
          const currentColumnLeads = leadsToUse.filter((lead) => lead.status === column.id);
          // Soma de valores estimados daquela etapa
          const totalValue = currentColumnLeads.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);

          // % de conversão daquela etapa
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
                className={`flex-shrink-0 w-[17%] sm:w-80 rounded-xl transition-all duration-200 ${isDragOver
                  ? 'shadow-lg border-[1px] border-[#E7C29C]'
                  : column.isAI
                    ? 'bg-gray-50 border-transparent border-t-4 border-[#C2946D]'
                    : 'bg-gray-50 border-transparent border-t-4'
                  }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Header da etapa */}
                <div
                  className="bg-white p-4 rounded-t-xl border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleHeaderClick(column)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {column.label}
                    </h3>
                    {column.isAI ? (
                      <span className="px-2 py-1 text-xs font-medium bg-white text-black rounded-full border border-gray-500">
                        IA
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-white text-black rounded-full border border-gray-500">
                        Manual
                      </span>
                    )}
                  </div>
                  {/* Métricas */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {currentColumnLeads.length}
                    </span>
                    <span className="flex items-center gap-1">
                      {totalValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 0
                      })}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {conversionRate}%
                    </span>
                  </div>
                </div>

                {/* Conteúdo da coluna */}
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

      {/* Aviso mobile */}
      <div className="lg:hidden mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-center">
          Para melhor experiência, visualize no computador
        </p>
      </div>

      <ManualMoveInfoModal
        isOpen={showManualMoveModal}
        onClose={() => setShowManualMoveModal(false)}
      />
      <StatusExplanationModal
        isOpen={showExplanationModal}
        onClose={() => setShowExplanationModal(false)}
        column={selectedColumn}
      />
    </div>
  );
}