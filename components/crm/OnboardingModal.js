import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import KanbanIcon from './icons/KanbanIcon';

export default function OnboardingModal({ isOpen, onClose }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    console.log('Valor do localStorage:', localStorage.getItem('crm_onboarding_dismissed'));
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('crm_onboarding_dismissed', 'true');
      console.log('✅ Modal marcado para não mostrar novamente');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-8 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(194, 148, 109, 0.1)'}}>
          <KanbanIcon className="w-8 h-8" style={{color: '#C2946D'}} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bem-vindo ao seu novo CRM!
        </h2>
        
        <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
          Sua área de trabalho inteligente organizando contatos do WhatsApp.
        </p>
       
        <div className="mt-6 flex items-center justify-center">
          <input
            type="checkbox"
            id="dontShowAgain"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="dontShowAgain" className="text-sm text-gray-600">
            Entendi, não quero ver de novo
          </label>
        </div>
        
        <div className="mt-3">
          <button
            onClick={handleClose}
            className="px-8 py-3 w-full sm:w-auto text-base bg-[#C2946D] text-white rounded-md hover:bg-[#B08356] transition-colors font-medium"
          >
            Começar a usar
          </button>
        </div>
      </div>
    </div>
  );
}