import { useEffect } from 'react';
import { useEffect as useEffectReact } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema } from '../../schemas/service.schema';
import type { ServiceData } from '../../schemas/service.schema';
import { useCreateService, useUpdateService, useService } from '../../hooks/useServices';
import { useParams, useNavigate } from 'react-router-dom';
import { FormField } from './FormField';
import { categoriasServicos } from '../../utils/categoriasServicos';

export default function ServiceForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { data: service, isLoading: isLoadingService } = useService(id || '');
  const createService = useCreateService();
  const updateService = useUpdateService();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ServiceData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: '', description: '', price: 0, category: '' },
  });

  useEffect(() => {
    if (isEdit && service) {
      (Object.keys(service) as (keyof ServiceData)[]).forEach((key) => {
        setValue(key, service[key]);
      });
    }
  }, [isEdit, service, setValue]);

  const availableCategories = categoriasServicos;

  const onSubmit = async (data: ServiceData) => {
    try {
      if (isEdit && id) {
        await updateService.mutateAsync({ id, data });
      } else {
        await createService.mutateAsync(data);
      }
      navigate('/services');
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  useEffectReact(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full mx-auto p-4 border rounded bg-white bg-opacity-90 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl mb-4">{isEdit ? 'Editar Serviço' : 'Cadastrar Serviço'}</h2>
        {isEdit && isLoadingService ? (
          <div className="mb-4 text-center">Carregando dados do serviço...</div>
        ) : null}
        <FormField label="Nome" error={errors.name?.message}>
          <input type="text" {...register('name')} className="w-full border p-2" />
        </FormField>
        <FormField label="Descrição" error={errors.description?.message}>
          <textarea {...register('description')} className="w-full border p-2" />
        </FormField>
        <FormField label="Preço" error={errors.price?.message}>
          <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full border p-2" />
        </FormField>
        <FormField label="Categoria" error={errors.category?.message}>
          <select {...register('category')} className="w-full border p-2">
            <option value="">Selecione uma categoria</option>
            {availableCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </FormField>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={createService.status === 'pending' || updateService.status === 'pending'}>
          {isEdit ? (updateService.status === 'pending' ? 'Salvando...' : 'Salvar') : (createService.status === 'pending' ? 'Cadastrando...' : 'Cadastrar')}
        </button>
        {(createService.status === 'error' || updateService.status === 'error') && (
          <div className="text-red-500 text-xs mt-2">Erro ao salvar serviço. Tente novamente.</div>
        )}
      </form>
    </div>
  );
} 