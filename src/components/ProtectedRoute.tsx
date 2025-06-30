import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AdminPage } from '../pages/AdminPage';
import { useJoias } from '../hooks/useJoias';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { adicionarJoia } = useJoias();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AdminPage adicionarJoia={adicionarJoia} />;
}; 