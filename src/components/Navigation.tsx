import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { handleWhatsApp } from '../utils/whatsapp';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
              onClick={() => navigate('/admin')}
              className="text-gray-500 hover:text-purple-600 text-sm cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 