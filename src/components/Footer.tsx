import React from 'react';
import { Phone, Instagram, MapPin } from 'lucide-react';
import { SocialButtons } from './SocialButtons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Stefane Piercing</h3>
            <p className="text-gray-300">Especialista em body piercing.</p>
            <div className="mt-4">
              <SocialButtons variant="inline" size="sm" />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                (75) 8368-0253
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Paulo Afonso, BA
              </p>
              <p className="flex items-center">
                <Instagram className="w-4 h-4 mr-2" />
                @stefanebodypiercing
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Horário</h3>
            <div className="space-y-2 text-gray-300">
              <p>Segunda à Sexta: 9h às 18h</p>
              <p>Sábado: 9h às 16h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Stefane Piercing. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}; 