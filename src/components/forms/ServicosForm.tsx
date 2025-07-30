import {  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useService, useCreateService, useUpdateService } from '../../hooks/useServices';
import { serviceSchema, type ServiceData } from '../../schemas/service.schema';
import { categoriasServicos } from '../../utils/categoriasServicos';

interface ServicosFormProps {
  id?: string;
  onClose?: () => void;
}

export default function ServicosForm({ id, onClose }: ServicosFormProps) {
  const isEdit = Boolean(id);
  const { data: service } = useService(id || '');
  const createService = useCreateService();
  const updateService = useUpdateService();

  const { register, handleSubmit, setValue } = useForm<ServiceData>({
    resolver: zodResolver(serviceSchema),
  });

  useEffect(() => {
    if (isEdit && service) {
      Object.entries(service).forEach(([key, value]) => {
        if (key in service) {
          setValue(key as keyof ServiceData, value as ServiceData[keyof ServiceData]);
        }
      });
    }
  }, [isEdit, service, setValue]);

  const onSubmit = async (data: ServiceData) => {
    try {
      if (isEdit && id) {
        await updateService.mutateAsync({ id, data });
      } else {
        await createService.mutateAsync(data);
      }
      if (onClose) onClose();
    } catch (err) {
      console.error('Erro ao salvar serviço:', err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEdit ? 'Editar Serviço' : 'Cadastrar Serviço'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Serviço</label>
            <input 
              type="text" 
              {...register('name')} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea 
              {...register('description')} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 h-20" 
              placeholder="Descrição do serviço"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
              <input 
                type="number" 
                step="0.01"
                {...register('price', { valueAsNumber: true })} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select 
                {...register('category')} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Selecione uma categoria</option>
                {categoriasServicos.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            {isEdit ? 'Salvar Alterações' : 'Adicionar Serviço'}
          </button>
          {onClose && (
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-colors cursor-pointer mt-2"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 