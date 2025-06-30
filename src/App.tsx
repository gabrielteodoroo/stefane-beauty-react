import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SocialButtons } from './components/SocialButtons';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { CatalogoPage } from './pages/CatalogoPage';
import { CuidadosPage } from './pages/CuidadosPage';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthProvider';
import { useJoias } from './hooks/useJoias';

const PiercingWebsite: React.FC = () => {
  const { joias } = useJoias();

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          {/* Navigation */}
          <Navigation />

          {/* Content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogoPage joias={joias} />} />
            <Route path="/cuidados" element={<CuidadosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Footer */}
          <Footer />

          {/* Social Buttons */}
          <SocialButtons variant="floating" size="lg" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default PiercingWebsite;