import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Shield, Award, Star, ShoppingBag, Heart, Scissors } from 'lucide-react';
import { handleWhatsApp } from '../utils/whatsapp';
import stefaneImage from '../assets/stefane-png.png';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50">
      <div className="relative bg-gradient-to-r from-purple-600 to-rose-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <img 
              src={stefaneImage}
              alt="Stefane - Especialista em Body Piercing"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">Stefane</h1>
          <p className="text-xl mb-2">Especialista em Body Piercing</p>
          <p className="text-lg mb-8 opacity-90">Perfuração Humanizada • Técnicas seguras • Joias de qualidade</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Shield className="w-5 h-5 mr-2" />
              <span>Ambiente Esterilizado</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Award className="w-5 h-5 mr-2" />
              <span>Certificada</span>
            </div>
            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              <span>5 estrelas</span>
            </div>
          </div>
          <button 
            onClick={() => handleWhatsApp()}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg cursor-pointer"
          >
            <Phone className="w-5 h-5 inline mr-2" />
            Agendar Atendimento
          </button>
        </div>
      </div>
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Serviços Especializados</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👂</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Piercing Tradicional</h3>
              <p className="text-gray-600">Orelha, nariz, lábio com técnicas seguras</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👅</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Piercing Oral</h3>
              <p className="text-gray-600">Língua e região bucal com cuidados especiais</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Piercing Íntimo</h3>
              <p className="text-gray-600">Procedimentos delicados em ambiente privativo</p>
              </div>
          </div>
        </div>
      </div>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <button 
              onClick={() => { navigate('/catalogo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-purple-600 hover:bg-purple-700 text-white p-8 rounded-lg text-center transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Ver Catálogo</h3>
              <p>Explore nossa coleção de joias premium</p>
            </button>
            <button 
              onClick={() => { navigate('/servicos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-8 rounded-lg text-center transition-colors cursor-pointer"
            >
              <Scissors className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Nossos Serviços</h3>
              <p>Conheça todos os tipos de piercing disponíveis</p>
            </button>
            <button 
              onClick={() => { navigate('/cuidados'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-rose-600 hover:bg-rose-700 text-white p-8 rounded-lg text-center transition-colors cursor-pointer"
            >
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Cuidados</h3>
              <p>Orientações para cuidar do seu piercing</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 