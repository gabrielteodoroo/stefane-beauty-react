import React from 'react';
import { handleWhatsApp } from '../utils/whatsapp';

export const CuidadosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Cuidados Pós-Piercing</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-purple-600">Primeiros Dias</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Limpe com soro fisiológico 2x ao dia
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use sabonete neutro sem perfume
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Evite tocar com as mãos sujas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Durma do lado oposto ao piercing
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-red-600">Evite</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Álcool, água oxigenada ou iodo
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Piscinas e mar nas primeiras semanas
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Remover a joia antes da cicatrização
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  Produtos com perfume na região
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Sinais de Alerta</h3>
          <p className="text-yellow-700 mb-3">Procure ajuda se notar:</p>
          <ul className="text-yellow-700 space-y-1">
            <li>• Vermelhidão excessiva ou que piora</li>
            <li>• Inchaço que não diminui após 3 dias</li>
            <li>• Pus amarelo ou esverdeado</li>
            <li>• Dor intensa que piora com o tempo</li>
            <li>• Febre</li>
          </ul>
        </div>

        <div className="text-center">
          <button 
            onClick={() => handleWhatsApp()}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Dúvidas? Fale Comigo!
          </button>
        </div>
      </div>
    </div>
  );
}; 