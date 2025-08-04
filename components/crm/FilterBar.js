import React, { useState, useEffect } from 'react';
import Search from 'lucide-react/dist/esm/icons/search';
import Filter from 'lucide-react/dist/esm/icons/filter';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import List from 'lucide-react/dist/esm/icons/list';
import Users from 'lucide-react/dist/esm/icons/users';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';
import { getStatusOptions } from '@/config/statusConfig';

function MaisOpcoesToggle({ show, setShow }) {
  return (
    <div className="flex md:hidden justify-center">
      <button
        className="flex items-center gap-1 text-gray-500 font-medium text-sm py-1 px-2 rounded transition-colors"
        onClick={() => setShow(s => !s)}
        aria-label="Mostrar mais opções"
        type="button"
      >
        {show ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        <span>Mais opções</span>
      </button>
    </div>
  );
}

export default function FilterBar(props) {
  const {
    searchTerm,
    setSearchTerm,
    priorityFilter,
    setPriorityFilter,
    viewMode,
    setViewMode,
    selectedLeads,
    onBulkMove,
    leads,
    onAddLead
  } = props;

  const [showMobileOptions, setShowMobileOptions] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBulkMove = (newStatus) => {
    onBulkMove(selectedLeads, newStatus);
  };

  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => ['sold_procedure', 'relationship'].includes(l.status)).length;
  const totalConversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6">
      <div className="flex flex-col gap-4">
        {/* Top Metrics e botão alinhados na mesma linha */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Total de Leads: <span className="font-semibold text-gray-900">{totalLeads}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Conversão Total: <span className="font-semibold text-gray-900">{totalConversionRate}%</span></span>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onAddLead && onAddLead()}
              className=" 
                w-full 
                sm:w-auto   
                bg-white 
                text-[#C2946D] 
                text-xs
                border 
                border-[#C2946D]
                cursor-pointer 
                px-4 
                rounded-md 
                h-10 
                font-semibold
                "
            >
              + Adicionar Lead
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200"></div>

        {/* Botão minimalista "Mais opções" no mobile */}
        <MaisOpcoesToggle show={showMobileOptions} setShow={setShowMobileOptions} />

        {/* Renderiza filtros e controles só se desktop ou showMobileOptions */}
        {(isDesktop || showMobileOptions) && (
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between md:flex md:flex-row md:gap-4">
            <div className="flex flex-1 gap-4 w-full">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome, WhatsApp ou procedimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {/* Select de Prioridade */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="pl-10 pr-8 h-10 w-40 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Todas</option>
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedLeads.length > 0 && (
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleBulkMove(e.target.value);
                        e.target.value = ''; // Reset select
                      }
                    }}
                    style={{ border: '2px solid #e7c39c' }}
                    className="pl-10 pr-8 h-10 w-48 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">{`Mover ${selectedLeads.length} leads`}</option>
                    {getStatusOptions().map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors flex items-center justify-center ${viewMode === 'kanban'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors flex items-center justify-center ${viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
