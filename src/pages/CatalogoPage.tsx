import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { handleWhatsApp } from '../utils/whatsapp';
import { categories } from '../utils/categorias';
import { useJewels } from '../hooks/useJewels';
import type { JewelData } from '../schemas/jewel.schema';
import type { Categoria } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';

export const CatalogoPage: React.FC = () => {
  function asJewelDataArray(arr: unknown): JewelData[] {
    return Array.isArray(arr) ? arr as JewelData[] : [];
  }
  const { data, isLoading } = useJewels();
  const joias: JewelData[] = asJewelDataArray(data);
  

  
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [search, setSearch] = useState<string>('');
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Travar scroll do body quando modal estiver aberto
  React.useEffect(() => {
    if (expandedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedImage]);

  // Função para fechar o modal
  const closeModal = () => {
    setExpandedImage(null);
  };

  // Função para fechar ao clicar fora da imagem
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
   
   
  const filteredJewelry: JewelData[] = joias.filter((jewelry: JewelData) => {
    const matchCategory = categoryFilter === 'todas' || jewelry.category === categoryFilter;
    const matchSearch = jewelry.name.toLowerCase().includes(search.toLowerCase()) ||
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
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="todas">Todas</option>
                {categories.map((category: Categoria) => (
                  <option key={category.id} value={category.id}>{category.nome}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {isLoading ? (
          <LoadingIndicator label="Carregando joias..." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJewelry.map((jewelry: JewelData) => {
              const bucket = import.meta.env.VITE_BUCKET || '';
              const imageUrl = jewelry.imageUrl;
              const cleanImageUrl = imageUrl?.replace(/^undefined/, '') || '';
              const imgPath = cleanImageUrl && cleanImageUrl.startsWith('/') ? cleanImageUrl : cleanImageUrl ? '/' + cleanImageUrl : '';
              const urlCompleta = bucket ? `${bucket}${imgPath}` : imgPath;
              return (
                <div key={jewelry.id ?? jewelry.name} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={urlCompleta}
                      alt={jewelry.name}
                      className="w-full h-48 object-cover cursor-zoom-in"
                      onClick={() => setExpandedImage(urlCompleta)}
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400">Sem imagem</div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{jewelry.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{jewelry.material}</p>
                    <p className="text-gray-500 text-sm mb-3">{jewelry.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-purple-600">
                        R$ {jewelry.price.toFixed(2)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        jewelry.stock > 10 ? 'bg-green-100 text-green-800' :
                        jewelry.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {jewelry.stock > 0 ? `${jewelry.stock} disponíveis` : 'Esgotado'}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleWhatsApp(jewelry as JewelData)}
                      disabled={jewelry.stock === 0}
                      className={`w-full py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                        jewelry.stock > 0 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {jewelry.stock > 0 ? 'Quero Esta!' : 'Indisponível'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {filteredJewelry.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma joia encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>

            {/* Modal para imagem expandida */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={handleBackdropClick}
        >
          <div className="relative bg-white rounded-lg shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Fechar imagem"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <img
              src={expandedImage}
              alt="Imagem expandida"
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 