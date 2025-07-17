import React from 'react';
import { handleWhatsApp } from '../utils/whatsapp';

export const CuidadosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-purple-700">🌸 Cuidados Pós-Perfuração – Stefane Beauty & Piercings 🌸</h1>
        <p className="text-center text-lg text-gray-700 mb-8">Perfuração humanizada, segura e com carinho 💖</p>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">✅ Cuidados Diários:</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-800">
            <li>
              <span className="font-semibold">Lave bem as mãos</span> antes de tocar no piercing.
            </li>
            <li>
              Higienize a região <span className="font-semibold">2x ao dia</span> (manhã e noite) com:<br/>
              <span className="ml-2">- Soro fisiológico 0,9% <span className="text-gray-400">ou</span></span><br/>
              <span className="ml-2">- Vitar (spray cicatrizante à base de digluconato de clorexidina).</span>
                </li>
            <li>
              <span className="font-semibold">Evite girar ou mover a joia.</span><br/>
              Isso pode causar microfissuras e atrasar a cicatrização.
                </li>
            <li>
              <span className="font-semibold">Não use álcool, água oxigenada ou pomadas.</span><br/>
              Esses produtos agridem a pele e prejudicam a cicatrização.
                </li>
            <li>
              <span className="font-semibold">Seque com papel toalha descartável</span>, dando leves batidinhas.<br/>
              Nunca use toalhas de tecido.
                </li>
          </ol>
        </div>

        <div className="bg-rose-50 border-l-4 border-rose-400 p-6 mb-8">
          <h2 className="text-xl font-bold text-rose-700 mb-2">🚫 O que evitar:</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li>Piscinas, mar, sauna e banhos muito quentes por pelo menos 30 dias.</li>
            <li>Dormir ou pressionar a área perfurada.</li>
            <li>Usar maquiagem, cremes ou produtos cosméticos na região.</li>
            <li>Trocar a joia antes do tempo recomendado (confira abaixo ⬇️).</li>
              </ul>
            </div>
            
        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-700 mb-2">⏳ Tempo Médio de Cicatrização:</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800 border">
              <thead>
                <tr className="bg-purple-100">
                  <th className="px-3 py-2 text-left">Local da Perfuração</th>
                  <th className="px-3 py-2 text-left">Tempo Estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-3 py-2">Lóbulo (1º, 2º furo)</td><td className="px-3 py-2">1 a 2 meses</td></tr>
                <tr><td className="px-3 py-2">Cartilagem (hélice, tragus, concha, etc)</td><td className="px-3 py-2">6 a 12 meses</td></tr>
                <tr><td className="px-3 py-2">Nariz</td><td className="px-3 py-2">2 a 4 meses</td></tr>
                <tr><td className="px-3 py-2">Umbigo</td><td className="px-3 py-2">6 meses a 1 ano</td></tr>
                <tr><td className="px-3 py-2">Microdermal / Surface</td><td className="px-3 py-2">6 a 12 meses</td></tr>
                <tr><td className="px-3 py-2">Piercings íntimos</td><td className="px-3 py-2">2 a 3 meses</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
          <h2 className="text-xl font-bold text-green-700 mb-2">✨ Sobre o Vitar:</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li>Use 2 vezes ao dia, aplicando diretamente na perfuração.</li>
            <li>Não precisa enxaguar.</li>
            <li>Ideal para manter a região limpa, prevenir inflamações e facilitar a cicatrização.</li>
            <li>Substitui o uso de álcool, sabonetes ou antissépticos agressivos.</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-700 mb-2">🩷 Observações:</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2">
            <li>Vermelhidão, leve inchaço ou secreção transparente são normais nos primeiros dias.</li>
            <li>Se surgir pus amarelo, dor intensa, febre ou calor local, procure ajuda profissional.</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-700 mb-2">📌 Dica da Stefane:</h2>
          <p className="text-gray-800 mb-2">Sempre mantenha sua joia original durante o tempo de cicatrização.</p>
          <p className="text-gray-800">Agende uma avaliação gratuita após 30 dias para acompanhamento!</p>
        </div>

        <div className="text-center mt-8">
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