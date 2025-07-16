import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/useAuthContext';

export default function PrivateRoute() {
  const auth = useAuthContext();
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
} 