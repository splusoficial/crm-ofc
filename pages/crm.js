'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import OnboardingModal from '../components/crm/OnboardingModal';
import FilterBar from '../components/crm/FilterBar';
import KanbanBoard from '../components/crm/KanbanBoard';
import ListView from '../components/crm/ListView';
import LeadDetailModal from '../components/crm/LeadDetailModal';
import AddLeadModal from '../components/crm/AddLeadModal';
import SidebarToggleIcon from '../components/crm/icons/SidebarToggleIcon';
import { useToggleSidebar } from '../Layout';

export default function CRM() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [viewMode, setViewMode] = useState('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddLead, setShowAddLead] = useState(false);
  const { toggleSidebar } = useToggleSidebar();

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      // Debug: vamos ver o que tem no localStorage
      console.log('👤 Usuário no localStorage:', storedUser);

      if (!storedUser?.wh_id) {
        console.warn("❌ wh_id não encontrado no localStorage");
        setLeads([]);
        setFilteredLeads([]);
        setIsLoading(false);
        return;
      }

      console.log('🔍 Buscando leads com wh_id:', storedUser.wh_id);

      // CORREÇÃO: Vamos buscar leads de duas formas
      // 1. Por wh_id
      // 2. Por owner_email (caso o sistema use email também)

      // Primeiro, tenta buscar por wh_id
      let { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .eq('wh_id', storedUser.wh_id)
        .order('updated_at', { ascending: false });

      console.log('📊 Leads encontrados por wh_id:', leadsData?.length || 0);

      // Se não encontrar nada por wh_id, tenta por owner_email
      if ((!leadsData || leadsData.length === 0) && storedUser.email) {
        console.log('🔄 Tentando buscar por owner_email:', storedUser.email);

        const { data: leadsByEmail, error: emailError } = await supabase
          .from('leads')
          .select('*')
          .eq('owner_email', storedUser.email)
          .order('updated_at', { ascending: false });

        if (!emailError && leadsByEmail) {
          leadsData = leadsByEmail;
          console.log('📊 Leads encontrados por email:', leadsData?.length || 0);
        }
      }

      // Debug: vamos ver a estrutura de um lead
      if (leadsData && leadsData.length > 0) {
        console.log('🔍 Exemplo de lead:', leadsData[0]);
      }

      if (leadsError) {
        console.error('❌ Erro ao buscar leads:', leadsError);
        throw leadsError;
      }

      const leadsFormatados = (leadsData || []).map((lead) => ({
        ...lead,
        nome: lead.full_name || lead.nome || lead.name, // Tenta vários campos possíveis
        procedimento_interesse: lead.interest_procedure || lead.procedimento_interesse,
        prioridade: lead.priority || lead.prioridade || 'medium',
        updated_date: lead.updated_at,
        historico_atividades: lead.activity_history || lead.historico_atividades || [],
      }));

      console.log('✅ Total de leads formatados:', leadsFormatados.length);
      setLeads(leadsFormatados);
    } catch (error) {
      console.error('❌ Erro ao carregar leads:', error);
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Só carrega leads se tiver usuário no localStorage
    const user = localStorage.getItem('user');
    if (user) {
      loadLeads();
    } else {
      console.warn('⚠️ Nenhum usuário encontrado no localStorage');
      setIsLoading(false);
    }

    const isDismissed = localStorage.getItem('crm_onboarding_dismissed') === 'true';
    setShowOnboarding(!isDismissed);
  }, [loadLeads]);

  // Recarrega leads quando o usuário é atualizado
  useEffect(() => {
    const handleUserUpdate = () => {
      console.log('🔄 Evento userUpdated detectado, recarregando leads...');
      loadLeads();
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, [loadLeads]);

  const filterLeads = useCallback(() => {
    let filtered = [...leads];
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((lead) =>
        lead.nome?.toLowerCase().includes(search) ||
        lead.whatsapp?.includes(search) ||
        (lead.procedimento_interesse?.toLowerCase().includes(search))
      );
    }
    if (priorityFilter) {
      filtered = filtered.filter((lead) => lead.prioridade === priorityFilter);
    }
    setFilteredLeads(filtered);
  }, [leads, searchTerm, priorityFilter]);

  useEffect(() => {
    filterLeads();
  }, [filterLeads]);

  const handleLeadClick = async (lead) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', lead.id)
        .single();

      if (error) throw error;

      const leadAtualizado = {
        ...data,
        nome: data.full_name || data.nome || data.name,
        procedimento_interesse: data.interest_procedure || data.procedimento_interesse,
        prioridade: data.priority || data.prioridade || 'medium',
        updated_date: data.updated_at,
        historico_atividades: data.activity_history || data.historico_atividades || [],
      };

      setSelectedLead(leadAtualizado);
    } catch (err) {
      console.error('Erro ao buscar lead:', err);
      setSelectedLead(lead);
    }
  };

  const handleSelectLead = (leadId, forceValue = null) => {
    setSelectedLeads((prev) => {
      const isSelected = prev.includes(leadId);
      const shouldSelect = forceValue !== null ? forceValue : !isSelected;
      if (shouldSelect && !isSelected) return [...prev, leadId];
      if (!shouldSelect && isSelected) return prev.filter((id) => id !== leadId);
      return prev;
    });
  };

  const handleUpdateLead = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
    setSelectedLead(updatedLead);
  };

  const handleMoveLeads = async (leadData, newStatus) => {
    const leadsToUpdate = Array.isArray(leadData) ? leadData : [leadData.id];
    try {
      for (const leadId of leadsToUpdate) {
        const lead = leads.find(l => l.id === leadId);
        if (!lead) continue;
        if (lead.status === newStatus) continue;

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const usuario = storedUser?.name || storedUser?.email || 'Desconhecido';

        const novaAtividade = {
          tipo: 'mudanca_status',
          data_hora: new Date().toISOString(),
          status_anterior: lead.status,
          status_novo: newStatus,
          usuario: usuario
        };
        const historico = [...(lead.historico_atividades || []), novaAtividade];

        const { data, error } = await supabase.from('leads').update({
          status: newStatus,
          activity_history: historico,
          updated_at: new Date().toISOString()
        }).eq('id', lead.id);

        if (error) {
          console.error('Erro ao mover lead:', error);
        }

        setLeads(prevLeads =>
          prevLeads.map(l =>
            l.id === lead.id
              ? { ...l, status: newStatus, historico_atividades: historico, updated_at: new Date().toISOString() }
              : l
          )
        );
      }
      if (Array.isArray(leadData)) setSelectedLeads([]);
    } catch (error) {
      console.error('Erro ao mover leads:', error);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="bg-[#fbfbfb] p-4 md:p-6 flex-1 overflow-auto">
        <div className="max-w-full mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={toggleSidebar}
              className="rounded-full text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
              style={{ margin: '0 15px' }}
              title="Abrir/Fechar Menu"
            >
              <SidebarToggleIcon className="w-6 h-6" />
            </button>
            <div className="bg-[#C1C1C1]" style={{ width: '2px', height: '26px' }}></div>
            <h1 className="h5 fw-medium mb-0" style={{ color: '#374151', fontSize: '1.125rem' }}>CRM</h1>
          </div>

          {/* Debug Info - Remova isso em produção */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-4 text-xs">
              <p>Debug: {leads.length} leads carregados</p>
              <p>User: {JSON.parse(localStorage.getItem('user') || '{}')?.email}</p>
              <p>wh_id: {JSON.parse(localStorage.getItem('user') || '{}')?.wh_id}</p>
            </div>
          )} */}

          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedLeads={selectedLeads}
            onBulkMove={(newStatus) => handleMoveLeads(selectedLeads, newStatus)}
            leads={filteredLeads}
            onAddLead={() => setShowAddLead(true)}
          />

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C2946D]"></div>
                <p className="text-gray-500 mt-4">Carregando leads...</p>
              </div>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Nenhum lead encontrado</p>
                <p className="text-sm text-gray-400">Verifique se existem leads para seu wh_id ou email</p>
              </div>
            </div>
          ) : viewMode === 'kanban' ? (
            <KanbanBoard
              leads={leads}
              filteredLeads={filteredLeads}
              onLeadClick={handleLeadClick}
              selectedLeads={selectedLeads}
              onSelectLead={handleSelectLead}
              onMoveLeads={handleMoveLeads}
              searchTerm={searchTerm}
              priorityFilter={priorityFilter}
            />
          ) : (
            <ListView
              leads={filteredLeads}
              onLeadClick={handleLeadClick}
              selectedLeads={selectedLeads}
              onSelectLead={handleSelectLead}
            />
          )}

          <OnboardingModal
            isOpen={showOnboarding}
            onClose={() => setShowOnboarding(false)}
          />

          <LeadDetailModal
            lead={selectedLead}
            isOpen={!!selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={handleUpdateLead}
          />

          <AddLeadModal
            isOpen={showAddLead}
            onClose={() => setShowAddLead(false)}
            onSubmit={(newLead) => {
              setLeads(prev => [...prev, newLead]);
            }}
          />
        </div>
      </div>
    </div>
  );
}
