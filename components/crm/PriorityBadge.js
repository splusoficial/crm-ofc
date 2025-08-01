import React from 'react';

export default function PriorityBadge({ priority }) {
  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'alta':
      case 'high':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'Alta'
        };
      case 'media':
      case 'medium':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          label: 'Média'
        };
      case 'baixa':
      case 'low':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: 'Baixa'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'Normal'
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}