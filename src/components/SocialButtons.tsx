import React from 'react';
import { InstagramLogo, WhatsappLogo } from '@phosphor-icons/react';
import { handleWhatsApp } from '../utils/whatsapp';

interface SocialButtonsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'floating' | 'inline';
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'floating' 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28
  };

  const handleInstagram = (): void => {
    const instagramUrl = 'https://www.instagram.com/stefanebodypiercing';
    window.open(instagramUrl, '_blank');
  };

  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg`;

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 ${className}`}>
        <button
          onClick={() => handleWhatsApp()}
          className={`${baseClasses} bg-green-500 hover:bg-green-600 text-white cursor-pointer`}
          title="Fale conosco no WhatsApp"
        >
          <WhatsappLogo size={iconSizes[size]} weight="fill" />
        </button>

        <button
          onClick={handleInstagram}
          className={`${baseClasses} bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer`}
          title="Siga-nos no Instagram"
        >
          <InstagramLogo size={iconSizes[size]} weight="fill" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        onClick={() => handleWhatsApp()}
        className={`${baseClasses} bg-green-500 hover:bg-green-600 text-white cursor-pointer`}
        title="Fale conosco no WhatsApp"
      >
        <WhatsappLogo size={iconSizes[size]} weight="fill" />
      </button>

      <button
        onClick={handleInstagram}
        className={`${baseClasses} bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer`}
        title="Siga-nos no Instagram"
      >
        <InstagramLogo size={iconSizes[size]} weight="fill" />
      </button>
    </div>
  );
}; 