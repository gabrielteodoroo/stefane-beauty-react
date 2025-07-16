import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gem, Wrench } from 'lucide-react';

interface AdminSidebarProps {
  title?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ title }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-purple-50 border-r border-purple-100 p-6">
        {title && <h2 className="text-xl font-bold text-purple-700 mb-8">{title}</h2>}
        <nav className="flex flex-col gap-2">
          <Link
            to="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${location.pathname === '/admin' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-100'} transition-colors`}
          >
            <Gem className="w-5 h-5" /> Joias
          </Link>
          <Link
            to="/admin-servicos"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${location.pathname === '/admin-servicos' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-100'} transition-colors mt-2`}
          >
            <Wrench className="w-5 h-5" /> Serviços
          </Link>
        </nav>
      </aside>
      {/* Sidebar mobile */}
      <div className="md:hidden">
        <button
          className="fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu admin"
        >
          <Menu className="w-6 h-6" />
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setOpen(false)} />
            <aside className="relative bg-white w-64 max-w-full h-full shadow-lg p-6 flex flex-col">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-purple-600"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
              {title && <h2 className="text-xl font-bold text-purple-700 mb-8">{title}</h2>}
              <nav className="flex flex-col gap-2 mt-8">
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${location.pathname === '/admin' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-100'} transition-colors`}
                  onClick={() => setOpen(false)}
                >
                  <Gem className="w-5 h-5" /> Joias
                </Link>
                <Link
                  to="/admin-servicos"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${location.pathname === '/admin-servicos' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-100'} transition-colors mt-2`}
                  onClick={() => setOpen(false)}
                >
                  <Wrench className="w-5 h-5" /> Serviços
                </Link>
              </nav>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}; 