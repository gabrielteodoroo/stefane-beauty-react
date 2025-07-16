import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SocialButtons } from './components/SocialButtons';
import ProtectedRoute from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { CatalogoPage } from './pages/CatalogoPage';
import { CuidadosPage } from './pages/CuidadosPage';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ServicosPage } from './pages/ServicosPage';
import { AdminServicosPage } from './pages/AdminServicosPage';
import { AdminPage } from './pages/AdminPage';

const PiercingWebsite: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navigation />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/cuidados" element={<CuidadosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin-servicos" element={<AdminServicosPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />

          <SocialButtons variant="floating" size="lg" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default PiercingWebsite;