export const statusConfig = {
  new_conversation: {
    id: 'new_conversation',
    label: 'Nova Conversa',
    isAI: true,
    order: 1,
    explicacao: 'Todas as novas conversas iniciam nesta etapa. Para que a IA assuma o atendimento automaticamente, o lead precisa estar sendo atendido por ela nesse momento.'
  },
  interested_lead: {
    id: 'interested_lead',
    label: 'Lead Interessado',
    isAI: true,
    order: 2,
    explicacao: 'Nesta etapa ficam os leads que demonstraram interesse real em continuar a conversa. A IA faz essa validação e move o lead automaticamente para cá.'
  },
  scheduled: {
    id: 'scheduled',
    label: 'Agendado',
    isAI: true,
    order: 3,
    explicacao: 'Se a IA agendou um horário com o lead, ele será movido para esta etapa automaticamente. Se o agendamento foi feito manualmente (sem a IA), você deve arrastar o lead para cá.'
  },
  cancelled: {
    id: 'cancelled',
    label: 'Cancelou',
    isAI: true,
    order: 4,
    explicacao: 'Se o lead desistiu do horário agendado, ele será movido para esta etapa. Recomenda-se entrar em contato e tentar reverter a desistência.'
  },
  rescheduled: {
    id: 'rescheduled',
    label: 'Reagendou',
    isAI: true,
    order: 5,
    explicacao: 'Leads que já tinham um horário, mas solicitaram uma nova data, serão movidos para esta etapa automaticamente. É importante acompanhar para evitar novas remarcações.'
  },
  showed_up: {
    id: 'showed_up',
    label: 'Compareceu',
    isAI: false,
    order: 6,
    explicacao: 'Se o lead compareceu à consulta, você deve movê-lo manualmente para esta etapa. Essa confirmação depende exclusivamente de uma pessoa da clínica.'
  },
  sold_procedure: {
    id: 'sold_procedure',
    label: 'Vendeu Procedimento',
    isAI: false,
    order: 7,
    explicacao: 'Se o lead compareceu e fechou um procedimento, mova-o manualmente para esta etapa.'
  },
  relationship: {
    id: 'relationship',
    label: 'Relacionamento',
    isAI: false,
    order: 8,
    explicacao: 'Clientes que já compraram e com os quais você deseja manter um acompanhamento (como um pós-venda) devem ser movidos manualmente para esta etapa. Essa etapa será automatizada em breve.'
  },
  others: {
    id: 'others',
    label: 'Fornecedores / Outros',
    isAI: true,
    order: 9,
    explicacao: 'Contatos que não são leads — como fornecedores, familiares ou pessoas com outros assuntos — serão identificados e movidos automaticamente para esta etapa pela IA.'
  }
};

// Função helper para obter informações do status
export const getStatusInfo = (status) => {
  return statusConfig[status] || {
    id: status,
    label: status,
    isAI: false,
    explicacao: 'Explicação não definida.'
  };
};

// Função para obter todos os status ordenados
export const getAllStatuses = () => {
  return Object.values(statusConfig).sort((a, b) => a.order - b.order);
};

// Função para obter array de opções para selects
export const getStatusOptions = () => {
  return getAllStatuses().map(status => ({
    value: status.id,
    label: status.label
  }));
};
