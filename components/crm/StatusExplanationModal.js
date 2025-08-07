import React, { useState } from 'react';
import { X } from 'lucide-react';

const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

export default function StatusExplanationModal({ isOpen, onClose, column }) {
  const [isAiActive, setIsAiActive] = useState(true);

  if (!isOpen || !column) return null;

  const handleAiToggle = (value) => {
    setIsAiActive(value);
    console.log(`IA for status ${column.id} is now ${value ? 'active' : 'paused'}`);
    // Aqui você pode chamar a função onPauseAIChange(column.id, value)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{column.label}</h2>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${column.isAI ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-gray-100 text-gray-800 border-gray-300'}`}>
              {column.isAI ? 'Etapa com IA' : 'Etapa Manual'}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          {column.explicacao || 'Nenhuma explicação definida para esta etapa.'}
        </p>

        {column.isAI && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <label htmlFor="ai-toggle" className="text-sm font-medium text-gray-800">
                Permitir atuação da IA nesta etapa
              </label>
              <Switch
                id="ai-toggle"
                checked={isAiActive}
                onChange={handleAiToggle}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
