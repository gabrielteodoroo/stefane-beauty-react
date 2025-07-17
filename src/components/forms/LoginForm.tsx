import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/user.schema';
import type { LoginData } from '../../schemas/user.schema';
import { FormField } from './FormField';
import { useAuthContext } from '../../contexts/useAuthContext';

export default function LoginForm() {
  const { login, isLoading, error } = useAuthContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    await login(data);
    if (!error) {
      navigate('/admin');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <FormField label="Email" error={errors.email?.message}>
        <input type="email" {...register('email')} className="w-full border p-2" />
      </FormField>
      <FormField label="Senha" error={errors.password?.message}>
        <input type="password" {...register('password')} className="w-full border p-2" />
      </FormField>
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
} 