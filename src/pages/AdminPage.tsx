import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { categories } from '../utils/categorias';
import type { NovaJoia, Categoria } from '../types';
import { SignOut } from '@phosphor-icons/react';

interface AdminPageProps {
  adicionarJoia: (novaJoia: NovaJoia) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ adicionarJoia }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [newJewelry, setNewJewelry] = useState<NovaJoia>({
    nome: '',
    preco: '',
    categoria: 'orelha',
    material: '',
    estoque: '',
    imagem: '',
    descricao: ''
  });

  const updateNewJewelry = (field: keyof NovaJoia, value: string): void => {
    setNewJewelry(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (): void => {
    adicionarJoia(newJewelry);
    setNewJewelry({
      nome: '',
      preco: '',
      categoria: 'orelha',
      material: '',
      estoque: '',
      imagem: '',
      descricao: ''
    });
  };

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Adicionar Nova Joia</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <SignOut className="w-4 h-4" />
            Sair
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Joia</label>
              <input
                type="text"
                value={newJewelry.nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNewJewelry('nome', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newJewelry.preco}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNewJewelry('preco', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estoque</label>
                <input
                  type="number"
                  value={newJewelry.estoque}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNewJewelry('estoque', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select
                  value={newJewelry.categoria}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateNewJewelry('categoria', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  {categories.slice(1).map((category: Categoria) => (
                    <option key={category.id} value={category.id}>{category.nome}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <input
                  type="text"
                  value={newJewelry.material}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNewJewelry('material', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Titânio, Aço Cirúrgico"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
              <input
                type="url"
                value={newJewelry.imagem}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNewJewelry('imagem', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea
                value={newJewelry.descricao}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateNewJewelry('descricao', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-20"
                placeholder="Descrição breve da joia"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Adicionar Joia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 