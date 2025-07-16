import React from 'react';
import { useServices } from '../hooks/useServices';
import { categoriasServicos } from '../utils/categoriasServicos';
import type { ServiceData } from '../schemas/service.schema';

export const ServicosPage: React.FC = () => {
  const { data: servicos = [], isLoading } = useServices();
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Catálogo de Serviços</h1>
        {isLoading ? (
          <div className="text-center py-12">Carregando serviços...</div>
        ) : (
          categoriasServicos.map(cat => (
            <div key={cat.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-700">{cat.nome}</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ul className="divide-y divide-gray-200">
                  {servicos.filter((s: ServiceData) => s.category === cat.id).map((servico: ServiceData) => (
                    <li key={servico.id ?? servico.name} className="flex items-center justify-between px-4 py-3">
                      <span className="block text-lg font-semibold text-gray-800">{servico.name}</span>
                      <span className="text-lg font-bold text-purple-600">R$ {servico.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 