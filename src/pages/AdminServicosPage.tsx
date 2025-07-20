import React, { useState, useEffect } from 'react';
import { useServices, useCreateService, useUpdateService, useDeleteService } from '../hooks/useServices';
import type { ServiceData } from '../schemas/service.schema';
import { categoriasServicos } from '../utils/categoriasServicos';
import { AdminSidebar } from '../components/AdminSidebar';
import { LoadingIndicator } from '../components/LoadingIndicator';

export const AdminServicosPage: React.FC = () => {
  const { data: servicos = [], isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [novoServico, setNovoServico] = useState<ServiceData>({
    name: '',
    description: '',
    price: 0,
    category: ''
  });

  const handleChange = (field: keyof ServiceData, value: string | number) => {
    setNovoServico((prev: ServiceData) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateService.mutateAsync({ id: editId, data: novoServico });
      setEditId(null);
    } else {
      await createService.mutateAsync(novoServico);
    }
    setNovoServico({ name: '', description: '', price: 0, category: '' });
    setShowForm(false);
  };

  const handleEdit = (servico: ServiceData) => {
    setEditId(servico.id ?? null);
    setNovoServico({
      name: servico.name,
      description: servico.description,
      price: servico.price,
      category: servico.category
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setServiceToDelete(id);
  };

  const confirmDelete = async () => {
    if (serviceToDelete) {
      await deleteService.mutateAsync(serviceToDelete);
      setServiceToDelete(null);
    }
  };

  const handleAddNew = () => {
    setEditId(null);
    setNovoServico({ name: '', description: '', price: 0, category: '' });
    setShowForm(true);
  };

  const availableCategories = categoriasServicos;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar title="Administração" />
      <main className="flex-1 py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Administração de Serviços</h1>
        <div className="mb-6">
          <button
            onClick={handleAddNew}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Adicionar Novo Serviço
          </button>
        </div>
        {showForm || editId !== null ? (
          <ModalScrollLock>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
                <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Serviço</label>
                <input
                  type="text"
                    value={novoServico.name}
                    onChange={e => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                    value={novoServico.description}
                    onChange={e => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-20"
                  placeholder="Descrição do serviço"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
                  <input
                    type="number"
                      value={novoServico.price}
                      onChange={e => handleChange('price', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select
                      value={novoServico.category}
                      onChange={e => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                      <option value="">Selecione uma categoria</option>
                      {availableCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
                  </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                  {editId !== null ? 'Salvar Alterações' : 'Adicionar Serviço'}
              </button>
              <button
                  onClick={() => { setEditId(null); setShowForm(false); setNovoServico({ name: '', description: '', price: 0, category: '' }); }}
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
          <h2 className="text-xl font-bold mb-4 text-gray-800">Serviços Cadastrados</h2>
          <div className="overflow-x-auto">
            {isLoading ? (
              <LoadingIndicator label="Carregando serviços..." />
            ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {servicos.map((servico: ServiceData) => (
                    <tr key={servico.id ?? servico.name}>
                      <td className="px-2 py-2">{servico.name}</td>
                      <td className="px-2 py-2">R$ {servico.price.toFixed(2)}</td>
                      <td className="px-2 py-2">{servico.category}</td>
                    <td className="px-2 py-2 flex gap-2">
                      <button
                          onClick={() => handleEdit(servico)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                        title="Editar"
                      >
                        Editar
                      </button>
                      <button
                          onClick={() => handleDelete(servico.id ?? '')}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
                        title="Excluir"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>
        {serviceToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">Tem certeza que deseja excluir este serviço?</p>
              <div className="flex gap-4">
                <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Excluir</button>
                <button onClick={() => setServiceToDelete(null)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          </div>
        </div>
      </div>
        )}
      </main>
    </div>
  );
};

function ModalScrollLock({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);
  return <>{children}</>;
} 