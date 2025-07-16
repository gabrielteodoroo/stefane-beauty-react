import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema } from '../../schemas/service.schema';
import type { ServiceData } from '../../schemas/service.schema';
import { useCreateService, useUpdateService, useService, useServices } from '../../hooks/useServices';
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
  const { data: allServices = [] } = useServices();

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

  // Filtra categorias já usadas, exceto a atual (em edição)
  const usedCategories = allServices
    .filter((s: ServiceData) => !isEdit || s.id !== id)
    .map((s: ServiceData) => s.category);
  const availableCategories = categoriasServicos.filter(cat => !usedCategories.includes(cat.id) || (isEdit && service?.category === cat.id));

  const onSubmit = async (data: ServiceData) => {
    try {
      if (isEdit && id) {
        await updateService.mutateAsync({ id, data });
      } else {
        await createService.mutateAsync(data);
      }
      navigate('/services');
    } catch {
      // Tratar erro se necessário
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 p-4 border rounded">
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
  );
} 