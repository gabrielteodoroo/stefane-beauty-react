import React, { useEffect } from 'react';
import { useEffect as useEffectReact } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jewelSchema } from '../../schemas/jewel.schema';
import type { JewelData } from '../../schemas/jewel.schema';
import { useCreateJewel, useUpdateJewel, useJewel, useJewels } from '../../hooks/useJewels';
import { useParams, useNavigate } from 'react-router-dom';
import { FormField } from './FormField';
import { categories } from '../../utils/categorias';

export default function JewelForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { data: jewel } = useJewel(id || '');
  const createJewel = useCreateJewel();
  const updateJewel = useUpdateJewel();
  const { data: allJewels = [] } = useJewels();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<JewelData>({
    resolver: zodResolver(jewelSchema),
  });

  useEffect(() => {
    if (isEdit && jewel) {
      Object.entries(jewel).forEach(([key, value]) => {
        setValue(key as keyof JewelData, value);
      });
    }
  }, [isEdit, jewel, setValue]);

  const usedCategories = allJewels
    .filter((j: JewelData) => !isEdit || j.id !== id)
    .map((j: JewelData) => j.category);
  const availableCategories = categories.filter(cat => cat.id !== 'todas' && (!usedCategories.includes(cat.id) || (isEdit && jewel?.category === cat.id)));

  const onSubmit = async (data: JewelData) => {
    if (isEdit && id) {
      await updateJewel.mutateAsync({ id, data });
    } else {
      await createJewel.mutateAsync(data);
    }
    navigate('/jewels');
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
        <h2 className="text-xl mb-4">{isEdit ? 'Editar Joia' : 'Cadastrar Joia'}</h2>
        <FormField label="Nome" error={errors.name?.message}>
          <input type="text" {...register('name')} className="w-full border p-2" />
        </FormField>
        <FormField label="Preço" error={errors.price?.message}>
          <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full border p-2" />
        </FormField>
        <FormField label="Estoque" error={errors.stock?.message}>
          <input type="number" {...register('stock', { valueAsNumber: true })} className="w-full border p-2" />
        </FormField>
        <FormField label="Categoria" error={errors.category?.message}>
          <select {...register('category')} className="w-full border p-2">
            <option value="">Selecione uma categoria</option>
            {availableCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Material" error={errors.material?.message}>
          <input type="text" {...register('material')} className="w-full border p-2" />
        </FormField>
        <FormField label="URL da Imagem" error={errors.imageUrl?.message}>
          <input type="url" {...register('imageUrl')} className="w-full border p-2" />
        </FormField>
        <FormField label="Descrição" error={errors.description?.message}>
          <textarea {...register('description')} className="w-full border p-2" />
        </FormField>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEdit ? 'Salvar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
} 