import React from 'react';

export default function AiStepCard({ label }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-0 mt-4">
      <div className="bg-white p-6 rounded-t-xl border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-gray-900">{label}</h3>
          <span className="px-3 py-1 text-sm font-semibold bg-white text-black rounded-full border border-gray-500">
            IA
          </span>
        </div>
      </div>
      <div className="p-6 text-left text-gray-700 leading-relaxed text-sm space-y-3">
        <p><strong>Etapas com a tag IA:</strong> A IA lê as mensagens do WhatsApp e move o lead sozinha para a etapa certa, como “Interessado”.</p>
        <ul className="list-disc list-inside">
          <li>Você não precisa fazer nada.</li>
          <li>🖐️ Mas, se quiser, pode arrastar o card manualmente.</li>
        </ul>
      </div>
    </div>
  );
}
