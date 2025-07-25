import React, { useState, useEffect } from 'react';
import { useJewels, useDeleteJewel } from '../hooks/useJewels';
import type { JewelData } from '../schemas/jewel.schema';
import { AdminSidebar } from '../components/AdminSidebar';
import { Trash } from 'lucide-react';
import { LoadingIndicator } from '../components/LoadingIndicator';
import JewelForm from '../components/forms/JewelForm';

export const AdminPage: React.FC = () => {
  const { data: joias = [], isLoading } = useJewels();
  const deleteJewel = useDeleteJewel();
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jewelryToDelete, setJewelryToDelete] = useState<string | null>(null);


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
            onClick={() => { setEditId(null); setShowForm(true); }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Adicionar Nova Joia
          </button>
        </div>
        {showForm || editId !== null ? (
          <ModalScrollLock>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <JewelForm id={editId ?? undefined} onClose={() => { setEditId(null); setShowForm(false); }} />
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
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Imagem</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {joias.map((jewelry: JewelData) => (
                    <tr key={jewelry.id ?? jewelry.name}>
                      <td className="px-2 py-2">
                        {jewelry.imageUrl && (
                          (() => {
                            const bucket = import.meta.env.VITE_BUCKET;
                            const imgPath = jewelry.imageUrl.startsWith('/') ? jewelry.imageUrl : `/${jewelry.imageUrl}`;
                            return (
                              <img
                                src={`${bucket}${imgPath}`}
                                alt={jewelry.name}
                                className="w-16 h-16 object-contain border rounded"
                              />
                            );
                          })()
                        )}
                      </td>
                      <td className="px-2 py-2">{jewelry.name}</td>
                      <td className="px-2 py-2">R$ {jewelry.price.toFixed(2)}</td>
                      <td className="px-2 py-2">{jewelry.stock}</td>
                    <td className="px-2 py-2 flex gap-2">
                      <button
                        onClick={() => setEditId(jewelry.id ?? null)}
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