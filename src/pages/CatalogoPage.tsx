import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { handleWhatsApp } from '../utils/whatsapp';
import { categories } from '../utils/categorias';
import type { Joia, Categoria } from '../types';

interface CatalogoPageProps {
  joias: Joia[];
}

export const CatalogoPage: React.FC<CatalogoPageProps> = ({ joias }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [search, setSearch] = useState<string>('');

  const filteredJewelry: Joia[] = joias.filter((jewelry: Joia) => {
    const matchCategory: boolean = categoryFilter === 'todas' || jewelry.categoria === categoryFilter;
    const matchSearch: boolean = jewelry.nome.toLowerCase().includes(search.toLowerCase()) ||
                       jewelry.material.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Catálogo de Joias</h1>
        
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar joias..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:w-64">
              <select
                value={categoryFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map((category: Categoria) => (
                  <option key={category.id} value={category.id}>{category.nome}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJewelry.map((jewelry: Joia) => (
            <div key={jewelry.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <img 
                src={jewelry.imagem} 
                alt={jewelry.nome}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{jewelry.nome}</h3>
                <p className="text-gray-600 text-sm mb-2">{jewelry.material}</p>
                <p className="text-gray-500 text-sm mb-3">{jewelry.descricao}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-purple-600">
                    R$ {jewelry.preco.toFixed(2)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    jewelry.estoque > 10 ? 'bg-green-100 text-green-800' :
                    jewelry.estoque > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {jewelry.estoque > 0 ? `${jewelry.estoque} disponíveis` : 'Esgotado'}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleWhatsApp(jewelry)}
                  disabled={jewelry.estoque === 0}
                  className={`w-full py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    jewelry.estoque > 0 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {jewelry.estoque > 0 ? 'Quero Esta!' : 'Indisponível'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJewelry.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma joia encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}; 