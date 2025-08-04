'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import OnboardingModal from '../components/crm/OnboardingModal';
import FilterBar from '../components/crm/FilterBar';
import KanbanBoard from '../components/crm/KanbanBoard';
import ListView from '../components/crm/ListView';
import LeadDetailModal from '../components/crm/LeadDetailModal';
import AddLeadModal from '../components/crm/AddLeadModal';
import SidebarToggleIcon from '../components/crm/icons/SidebarToggleIcon';
import { useToggleSidebar } from '../Layout';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { magic_login } = router.query;

    if (magic_login) {
      handleMagicLogin(magic_login);
    } else {
      checkAuthUser();
    }
  }, [router.isReady]);

  const loadLeads = async (email) => {
    setIsLoading(true);
    try {
      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (userError) throw userError;
      if (!userData) {
        setLeads([]);
        setFilteredLeads([]);
        setIsLoading(false);
        return;
      }

      let query = supabase
        .from('leads')
        .select('*')
        .order('updated_at', { ascending: false });

      if (userData.wh_id) {
        query = query.eq('wh_id', userData.wh_id);
      }

      const { data: leadsData, error: leadsError } = await query;

      if (leadsError) throw leadsError;

      const leadsFormatados = (leadsData || []).map((lead) => ({
        ...lead,
        nome: lead.full_name,
        procedimento_interesse: lead.interest_procedure,
        prioridade: lead.priority,
        updated_date: lead.updated_at,
        historico_atividades: lead.activity_history,
      }));

      setLeads(leadsFormatados);
      setFilteredLeads(leadsFormatados);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      setLeads([]);
      setFilteredLeads([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isDismissed = localStorage.getItem('crm_onboarding_dismissed') === 'true';
    setShowOnboarding(!isDismissed);
  }, []);

  const filterLeads = () => {
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
  };

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
        nome: data.full_name,
        procedimento_interesse: data.interest_procedure,
        prioridade: data.priority,
        updated_date: data.updated_at,
        historico_atividades: data.activity_history,
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

      if (shouldSelect && !isSelected) {
        return [...prev, leadId];
      } else if (!shouldSelect && isSelected) {
        return prev.filter((id) => id !== leadId);
      }
      return prev;
    });
  };

  const handleUpdateLead = async (updatedLead) => {
    try {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === updatedLead.id ? updatedLead : lead
        )
      );
      setSelectedLead(updatedLead);
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
    }
  };

  const handleMoveLeads = async (leadData, newStatus) => {
    if (Array.isArray(leadData)) {
      try {
        const updatedLeads = await Promise.all(
          leads.map(async (lead) => {
            const deveAtualizar = leadData.includes(lead.id) && lead.status !== newStatus;

            if (deveAtualizar) {
              const novaAtividade = {
                tipo: 'mudanca_status',
                data_hora: new Date().toISOString(),
                status_anterior: lead.status,
                status_novo: newStatus,
                usuario: 'Usuário'
              };

              const historico = [...(lead.historico_atividades || []), novaAtividade];

              const { error } = await supabase
                .from('leads')
                .update({
                  status: newStatus,
                  activity_history: historico,
                  updated_at: new Date().toISOString()
                })
                .eq('id', lead.id);

              if (error) throw error;

              return {
                ...lead,
                status: newStatus,
                historico_atividades: historico,
                updated_at: new Date().toISOString()
              };
            }

            return lead;
          })
        );

        setLeads(updatedLeads);
        setSelectedLeads([]);
      } catch (error) {
        console.error('Erro geral ao mover leads:', error);
      }
      return;
    }

    if (typeof leadData === 'object' && leadData.id) {
      if (leadData.status === newStatus) return;

      try {
        const novaAtividade = {
          tipo: 'mudanca_status',
          data_hora: new Date().toISOString(),
          status_anterior: leadData.status,
          status_novo: newStatus,
          usuario: 'Usuário'
        };

        const historico = [...(leadData.historico_atividades || []), novaAtividade];

        const { error: updateError } = await supabase
          .from('leads')
          .update({
            status: newStatus,
            activity_history: historico,
            updated_at: new Date().toISOString()
          })
          .eq('id', leadData.id);

        if (updateError) throw updateError;

        const leadAtualizado = {
          ...leadData,
          status: newStatus,
          historico_atividades: historico,
          updated_at: new Date().toISOString()
        };

        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead.id === leadData.id ? leadAtualizado : lead
          )
        );

      } catch (error) {
        console.error('Erro ao mover lead via drag and drop:', error);
      }
      return;
    }

    console.error('Formato de leadData não reconhecido:', leadData);
  };

  const handleBulkMove = (leadIds, newStatus) => {
    handleMoveLeads(leadIds, newStatus);
  };

  const checkAuthUser = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      if (storedUser?.email) {
        if (!storedUser.isAuthenticated) {
          storedUser.isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(storedUser));
        }

        setTimeout(() => window.dispatchEvent(new Event('userUpdated')), 100);
        setTimeout(() => window.dispatchEvent(new Event('userUpdated')), 500);
        setTimeout(() => window.dispatchEvent(new Event('userUpdated')), 1000);

        await loadLeads(storedUser.email);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (user?.email) {
        const { data: userData } = await supabase
          .from('user')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        const userSession = {
          email: user.email,
          name: userData?.name || 'Usuário',
          wh_id: userData?.wh_id,
          loginMethod: 'supabase_auth',
          isAuthenticated: true
        };

        localStorage.setItem('user', JSON.stringify(userSession));

        setTimeout(() => window.dispatchEvent(new Event('userUpdated')), 100);
        setTimeout(() => window.dispatchEvent(new Event('userUpdated')), 500);

        await loadLeads(user.email);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('💥 Erro ao verificar usuário:', error);
      setIsLoading(false);
    }
  };

  const handleMagicLogin = async (email) => {
    try {
      const { data: userData, error } = await supabase
        .from('user')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error || !userData) {
        alert('Erro ao buscar dados do usuário. Faça login novamente.');
        return;
      }

      const userSession = {
        email: userData.email,
        name: userData.name || 'Usuário',
        wh_id: userData.wh_id,
        loginMethod: 'magic_verified',
        timestamp: new Date().toISOString(),
        isAuthenticated: true
      };

      localStorage.setItem('user', JSON.stringify(userSession));
      window.dispatchEvent(new Event('userUpdated'));
      router.push('/crm');

      await loadLeads(email);
    } catch (err) {
      console.error('❌ Erro no magic login:', err);
    }
  };

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, priorityFilter]);

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

          <FilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedLeads={selectedLeads}
            onBulkMove={handleBulkMove}
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
          ) : viewMode === 'kanban' ? (
            <KanbanBoard
              leads={leads}
              filteredLeads={filteredLeads || []}
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
              setFilteredLeads(prev => [...prev, newLead]);
              setShowAddLead(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
