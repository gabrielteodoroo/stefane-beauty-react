import { useContext } from 'react';
import AuthContext from './AuthContext.tsx';

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
  return context;
} 