import React, { useState, useEffect } from 'react';
import { useJewels, useCreateJewel, useUpdateJewel, useDeleteJewel } from '../hooks/useJewels';
import type { JewelData } from '../schemas/jewel.schema';
import { categories } from '../utils/categorias';
import { AdminSidebar } from '../components/AdminSidebar';
import { Trash } from 'lucide-react';
import { LoadingIndicator } from '../components/LoadingIndicator';

export const AdminPage: React.FC = () => {
  const { data: joias = [], isLoading } = useJewels();
  const createJewel = useCreateJewel();
  const updateJewel = useUpdateJewel();
  const deleteJewel = useDeleteJewel();
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jewelryToDelete, setJewelryToDelete] = useState<string | null>(null);
  const [newJewelry, setNewJewelry] = useState<JewelData>({
    name: '',
    price: 0,
    category: '',
    material: '',
    stock: 0,
    imageUrl: '',
    description: ''
  });

  const updateNewJewelry = (field: keyof JewelData, value: string | number): void => {
    setNewJewelry(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (editId) {
      await updateJewel.mutateAsync({ id: editId, data: newJewelry });
      setEditId(null);
    } else {
      await createJewel.mutateAsync(newJewelry);
    }
    setNewJewelry({ name: '', price: 0, category: '', material: '', stock: 0, imageUrl: '', description: '' });
    setShowForm(false);
  };

  const handleEdit = (jewelry: JewelData): void => {
    setEditId(jewelry.id ?? null);
    setNewJewelry({
      name: jewelry.name,
      price: jewelry.price,
      category: jewelry.category,
      material: jewelry.material,
      stock: jewelry.stock,
      imageUrl: jewelry.imageUrl,
      description: jewelry.description
    });
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditId(null);
    setNewJewelry({ name: '', price: 0, category: '', material: '', stock: 0, imageUrl: '', description: '' });
    setShowForm(true);
  };

  const availableCategories = categories.filter(cat => cat.id !== 'todas');

  const handleDelete = (id: string) => {
    setJewelryToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (jewelryToDelete) {
      await deleteJewel.mutateAsync(jewelryToDelete);
      setJewelryToDelete(null);
      setShowConfirm(false);
    }
  };

  const cancelDelete = () => {
    setJewelryToDelete(null);
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar title="Administração" />
      <main className="flex-1 py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Administração de Joias</h1>
        <div className="mb-6">
          <button
            onClick={handleAddNew}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Adicionar Nova Joia
          </button>
        </div>
        {showForm || editId !== null ? (
          <ModalScrollLock>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
                <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Joia</label>
                <input
                  type="text"
                    value={newJewelry.name}
                    onChange={e => updateNewJewelry('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                      value={newJewelry.price}
                      onChange={e => updateNewJewelry('price', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estoque</label>
                  <input
                    type="number"
                      value={newJewelry.stock}
                      onChange={e => updateNewJewelry('stock', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                      value={newJewelry.category}
                      onChange={e => updateNewJewelry('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                      <option value="">Selecione uma categoria</option>
                      {availableCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                  <input
                    type="text"
                    value={newJewelry.material}
                      onChange={e => updateNewJewelry('material', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: Titânio, Aço Cirúrgico"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                <input
                  type="url"
                    value={newJewelry.imageUrl}
                    onChange={e => updateNewJewelry('imageUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                    value={newJewelry.description}
                    onChange={e => updateNewJewelry('description', e.target.value)}
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
                  onClick={() => { setEditId(null); setShowForm(false); setNewJewelry({ name: '', price: 0, category: '', material: '', stock: 0, imageUrl: '', description: '' }); }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition-colors cursor-pointer mt-2"
              >
                Cancelar
              </button>
                </div>
              </div>
            </div>
          </ModalScrollLock>
        ) : null}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Joias Cadastradas</h2>
          <div className="overflow-x-auto">
            {isLoading ? (
              <LoadingIndicator label="Carregando joias..." />
            ) : (
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
                  {joias.map((jewelry: JewelData) => (
                    <tr key={jewelry.id ?? jewelry.name}>
                      <td className="px-2 py-2">{jewelry.name}</td>
                      <td className="px-2 py-2">R$ {jewelry.price.toFixed(2)}</td>
                      <td className="px-2 py-2">{jewelry.stock}</td>
                    <td className="px-2 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(jewelry)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer flex items-center gap-1"
                        title="Editar"
                      >
                          Editar
                      </button>
                      <button
                          onClick={() => handleDelete(jewelry.id ?? '')}
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
            )}
          </div>
        </div>
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">Tem certeza que deseja excluir esta joia?</p>
              <div className="flex gap-4">
                <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Excluir</button>
                <button onClick={cancelDelete} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Componente auxiliar para travar o scroll do body
function ModalScrollLock({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);
  return <>{children}</>;
} 