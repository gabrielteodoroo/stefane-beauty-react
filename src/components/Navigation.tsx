import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { handleWhatsApp } from '../utils/whatsapp';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-purple-600">
            Stefane Piercing
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link 
              to="/"
              className={`hover:text-purple-600 transition-colors ${isActive('/') ? 'text-purple-600 font-semibold' : 'text-gray-700'}`}
            >
              Início
            </Link>
            <Link 
              to="/catalogo"
              className={`hover:text-purple-600 transition-colors ${isActive('/catalogo') ? 'text-purple-600 font-semibold' : 'text-gray-700'}`}
            >
              Catálogo
            </Link>
            <Link 
              to="/servicos"
              className={`hover:text-purple-600 transition-colors ${isActive('/servicos') ? 'text-purple-600 font-semibold' : 'text-gray-700'}`}
            >
              Serviços
            </Link>
            <Link 
              to="/cuidados"
              className={`hover:text-purple-600 transition-colors ${isActive('/cuidados') ? 'text-purple-600 font-semibold' : 'text-gray-700'}`}
            >
              Cuidados
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleWhatsApp()}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 inline mr-1" />
              WhatsApp
            </button>
            <button
              className="md:hidden text-gray-700 focus:outline-none ml-2"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white w-64 max-w-full h-full shadow-lg p-6 flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-purple-600"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="mt-8 flex flex-col gap-4">
              <Link to="/" className="text-lg font-medium text-gray-800 hover:text-purple-600" onClick={() => setSidebarOpen(false)}>
                Início
              </Link>
              <Link to="/catalogo" className="text-lg font-medium text-gray-800 hover:text-purple-600" onClick={() => setSidebarOpen(false)}>
                Catálogo
              </Link>
              <Link to="/servicos" className="text-lg font-medium text-gray-800 hover:text-purple-600" onClick={() => setSidebarOpen(false)}>
                Serviços
              </Link>
              <Link to="/cuidados" className="text-lg font-medium text-gray-800 hover:text-purple-600" onClick={() => setSidebarOpen(false)}>
                Cuidados
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}; 