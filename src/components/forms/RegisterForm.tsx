import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/user.schema';
import type { RegisterData } from '../../schemas/user.schema';
import { useAuthContext } from '../../contexts/useAuthContext';
import { FormField } from './FormField';

export default function RegisterForm() {
  const { register: registerUser, isLoading, error } = useAuthContext();  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    await registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">Cadastro</h2>
      <FormField label="Nome" error={errors.name?.message}>
        <input type="text" {...register('name')} className="w-full border p-2" />
      </FormField>
      <FormField label="Email" error={errors.email?.message}>
        <input type="email" {...register('email')} className="w-full border p-2" />
      </FormField>
      <FormField label="Senha" error={errors.password?.message}>
        <input type="password" {...register('password')} className="w-full border p-2" />
      </FormField>
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={isLoading}>
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
} 