import React from 'react';

export default function ManualStepCard({ label }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-0 mt-4">
      <div className="bg-white p-6 rounded-t-xl border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-gray-900">{label}</h3>
          <span className="px-3 py-1 text-sm font-semibold bg-white text-black rounded-full border border-[#E6C39C]">
            Manual
          </span>
        </div>
      </div>
      <div className="p-6 text-left text-gray-700 leading-relaxed text-sm space-y-3">
        <p><strong>Etapas com a tag manual:</strong> São situações fora do WhatsApp, como: "Compareceu", "Vendeu Procedimento"</p>
        <ul className="list-disc list-inside">
          <li>A IA não sabe disso.</li>
          <li>Você precisa arrastar o card manualmente.</li>
        </ul>
      </div>
    </div>
  );
}
