import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useJoias } from '../hooks/useJoias';
import { categories } from '../utils/categorias';
import type { NovaJoia, Categoria, Joia } from '../types';
import { SignOut, PencilSimple, Trash } from '@phosphor-icons/react';

interface AdminPageProps {
  adicionarJoia: (novaJoia: NovaJoia) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ adicionarJoia }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { joias, deleteJewelry, editJewelry } = useJoias();
  const [newJewelry, setNewJewelry] = useState<NovaJoia>({
    nome: '',
    preco: '',
    categoria: 'orelha',
    material: '',
    estoque: '',
    imagem: '',
    descricao: ''
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const updateNewJewelry = (field: keyof NovaJoia, value: string): void => {
    setNewJewelry(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (): void => {
    if (editId !== null) {
      editJewelry(editId, newJewelry);
      setEditId(null);
    } else {
      adicionarJoia(newJewelry);
    }
    setNewJewelry({
      nome: '',
      preco: '',
      categoria: 'orelha',
      material: '',
      estoque: '',
      imagem: '',
      descricao: ''
    });
    setShowForm(false);
  };

  const handleEdit = (jewelry: Joia): void => {
    setEditId(jewelry.id);
    setNewJewelry({
      nome: jewelry.nome,
      preco: jewelry.preco.toString(),
      categoria: jewelry.categoria,
      material: jewelry.material,
      estoque: jewelry.estoque.toString(),
      imagem: jewelry.imagem,
      descricao: jewelry.descricao
    });
    setShowForm(true);
  };

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

  const handleAddNew = () => {
    setEditId(null);
    setNewJewelry({ nome: '', preco: '', categoria: 'orelha', material: '', estoque: '', imagem: '', descricao: '' });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Administração de Joias</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <SignOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={handleAddNew}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Adicionar Nova Joia
          </button>
        </div>

        {showForm || editId !== null ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
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
                {editId ? 'Salvar Alterações' : 'Adicionar Joia'}
              </button>
              <button
                onClick={() => { setEditId(null); setShowForm(false); setNewJewelry({ nome: '', preco: '', categoria: 'orelha', material: '', estoque: '', imagem: '', descricao: '' }); }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition-colors cursor-pointer mt-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null}

        {/* Listagem de Joias */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Joias Cadastradas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {joias.map(jewelry => (
                  <tr key={jewelry.id}>
                    <td className="px-2 py-2">{jewelry.nome}</td>
                    <td className="px-2 py-2">R$ {jewelry.preco.toFixed(2)}</td>
                    <td className="px-2 py-2">{jewelry.estoque}</td>
                    <td className="px-2 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(jewelry)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer flex items-center gap-1"
                        title="Editar"
                      >
                        <PencilSimple size={16} /> Editar
                      </button>
                      <button
                        onClick={() => deleteJewelry(jewelry.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer flex items-center gap-1"
                        title="Excluir"
                      >
                        <Trash size={16} /> Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 