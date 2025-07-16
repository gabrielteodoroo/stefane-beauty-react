import React from 'react';
import LoginForm from '../components/forms/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-rose-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center">
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Área Administrativa</h2>
          <p className="mt-2 text-sm text-gray-600">
            Digite seu e-mail e senha para acessar o painel de administração
          </p>
        </div>
        <LoginForm />
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-purple-600 hover:text-purple-500 cursor-pointer">
            Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}; 