import React from 'react';
import { getStatusInfo } from '@/config/statusConfig';

export default function StatusBadge({ status, showAI = true }) {
  const statusInfo = getStatusInfo(status);
  const isAI = ['new_conversation', 'interested_lead', 'scheduled'].includes(status);

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
      {showAI && isAI && <span className="mr-1">✨</span>}
      {statusInfo.label}
    </span>
  );
}