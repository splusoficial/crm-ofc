import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { TrendingUp } from 'lucide-react';

export default function ManualMoveInfoModal({ isOpen, onClose }) {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        if (dontShowAgain) {
            localStorage.setItem('crm_manual_move_info_dismissed', 'true');
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-xl max-w-4xl w-full p-7 shadow-2xl text-center">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Passagem de Leads
                </h2>
                <p className="text-base text-gray-700 mb-8">
                    Entenda como funciona as passagens de leads entre etapas:
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Exemplo IA */}
                    <div className="bg-white rounded-xl border border-gray-200 p-0">
                        <div className="bg-white p-6 rounded-t-xl border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg text-gray-900">Lead Interessado</h3>
                                <span className="px-3 py-1 text-sm font-semibold bg-white text-black rounded-full border border-gray-500">
                                    IA
                                </span>
                            </div>
                        </div>
                        <div className="p-6 text-left">
                            <h4 className="font-semibold text-md mb-2 text-gray-800">
                                Atualização Automática
                            </h4>
                            <p className="text-base text-gray-700 leading-relaxed">
                                Esta etapa pode ser atualizada por você, mas ela já é atualizada automaticamente pela inteligência artificial.
                            </p>
                        </div>
                    </div>
                    {/* Exemplo Manual */}
                    <div className="bg-white rounded-xl border border-gray-200 p-0">
                        <div className="bg-white p-6 rounded-t-xl border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg text-gray-900">Vendeu Procedimento</h3>
                                <span className="px-3 py-1 text-sm font-semibold bg-white text-black rounded-full border border-[#E6C39C]">
                                    Manual
                                </span>
                            </div>
                        </div>
                        <div className="p-6 text-left">
                            <h4 className="font-semibold text-md mb-2 text-gray-800">
                                Atualização Manual
                            </h4>
                            <p className="text-base text-gray-700 leading-relaxed">
                                Esta etapa deve ser atualizada manualmente por quem está fisicamente na clínica.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Espaço maior entre conteúdo e checkbox */}
                <div className="mt-10 flex items-center justify-center mb-6">
                    <input
                        type="checkbox"
                        id="dontShowAgainManualMove"
                        checked={dontShowAgain}
                        onChange={e => setDontShowAgain(e.target.checked)}
                        className="mr-3 w-5 h-5"
                    />
                    <label htmlFor="dontShowAgainManualMove" className="text-base text-gray-700 select-none">
                        Entendi, não quero ver de novo
                    </label>
                </div>

                <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-[#C2946D] text-white rounded-md hover:bg-[#B08356] transition-colors font-semibold text-base"
                >
                    Ok, entendi
                </button>
            </div>
        </div>
    );
}