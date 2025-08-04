export const statusConfig = {
  new_conversation: {
    id: 'new_conversation',
    label: 'Nova Conversa',
    isAI: true,
    order: 1
  },
  interested_lead: {
    id: 'interested_lead',
    label: 'Lead Interessado',
    isAI: true,
    order: 2
  },
  scheduled: {
    id: 'scheduled',
    label: 'Agendado',
    isAI: true,
    order: 3
  },
  cancelled: {
    id: 'cancelled',
    label: 'Cancelou',
    isAI: true,
    order: 4
  },
  rescheduled: {
    id: 'rescheduled',
    label: 'Reagendou',
    isAI: true,
    order: 5
  },
  showed_up: {
    id: 'showed_up',
    label: 'Compareceu',
    isAI: false,
    order: 6
  },
  sold_procedure: {
    id: 'sold_procedure',
    label: 'Vendeu Procedimento',
    isAI: false,
    order: 7
  },
  relationship: {
    id: 'relationship',
    label: 'Relacionamento',
    isAI: false,
    order: 8
  },
  others: {
    id: 'others',
    label: 'Fornecedores / Outros',
    isAI: true,
    order: 9
  }
};

// Função helper para obter informações do status
export const getStatusInfo = (status) => {
  return statusConfig[status] || {
    id: status,
    label: status,
    isAI: false,
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
