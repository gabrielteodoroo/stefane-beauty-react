import React, { useState } from 'react';
import { useServices, useDeleteService } from '../hooks/useServices';
import type { ServiceData } from '../schemas/service.schema';
import { AdminSidebar } from '../components/AdminSidebar';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ModalScrollLock } from '../components/ModalScrollLock';
import { ConfirmModal } from '../components/ConfirmModal';
import ServicosForm from '../components/forms/ServicosForm';

export const AdminServicosPage: React.FC = () => {
  const { data: servicos = [], isLoading } = useServices();
  const deleteService = useDeleteService();
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  const handleEdit = (servico: ServiceData) => {
    setEditId(servico.id ?? null);
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
    setShowForm(true);
  };

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
        {(showForm || editId !== null) && (
          <ModalScrollLock>
            <ServicosForm 
              id={editId ?? undefined} 
              onClose={() => { 
                setEditId(null); 
                setShowForm(false); 
              }} 
            />
          </ModalScrollLock>
        )}
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
        <ConfirmModal
          isOpen={!!serviceToDelete}
          message="Tem certeza que deseja excluir este serviço?"
          onConfirm={confirmDelete}
          onCancel={() => setServiceToDelete(null)}
        />
      </main>
    </div>
  );
}; 