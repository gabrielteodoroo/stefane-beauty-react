import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext.tsx';
import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser } from '../services/api';
import type { RegisterData, LoginData } from '../schemas/user.schema';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => loginUser(data).then(res => res.data),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => registerUser(data).then(res => res.data),
  });
} 