import type { Joia } from '../types';

export const handleWhatsApp = (jewelry?: Joia): void => {
  const phoneNumber: string = '557583680253';
  let message: string = 'Olá! Gostaria de saber mais sobre seus serviços de piercing.';
  
  if (jewelry) {
    message = `Olá! Tenho interesse na joia: ${jewelry.nome} - R$ ${jewelry.preco.toFixed(2)}`;
  }
  
  const url: string = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}; 