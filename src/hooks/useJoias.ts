import { useState, useEffect } from 'react';
import type { Joia, NovaJoia } from '../types';

export const useJoias = () => {
  const [jewelry, setJewelry] = useState<Joia[]>([]);

  // Dados iniciais das joias (simulando uma base de dados)
  useEffect(() => {
    const initialJewelry: Joia[] = [
      {
        id: 1,
        nome: 'Argola Titânio Rosa',
        preco: 45.90,
        categoria: 'orelha',
        material: 'Titânio',
        estoque: 12,
        imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
        descricao: 'Argola delicada em titânio anodizado rosa'
      },
      {
        id: 2,
        nome: 'Barbell Ouro 14k',
        preco: 189.90,
        categoria: 'lingua',
        material: 'Ouro 14k',
        estoque: 5,
        imagem: 'https://images.unsplash.com/photo-1506629905708-b5f2f0c8d7d0?w=300&h=300&fit=crop',
        descricao: 'Barbell premium em ouro 14k com esferas'
      },
      {
        id: 3,
        nome: 'Plugs Aço Cirúrgico',
        preco: 29.90,
        categoria: 'orelha',
        material: 'Aço Cirúrgico',
        estoque: 20,
        imagem: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
        descricao: 'Par de plugs em aço cirúrgico polido'
      },
      {
        id: 4,
        nome: 'Banana Curva Titânio',
        preco: 65.90,
        categoria: 'umbigo',
        material: 'Titânio',
        estoque: 8,
        imagem: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
        descricao: 'Banana curva com cristais Swarovski'
      }
    ];
    setJewelry(initialJewelry);
  }, []);

  const addJewelry = (newJewelry: NovaJoia): void => {
    if (newJewelry.nome && newJewelry.preco) {
      const jewelryItem: Joia = {
        id: Date.now(),
        nome: newJewelry.nome,
        preco: parseFloat(newJewelry.preco),
        categoria: newJewelry.categoria,
        material: newJewelry.material,
        estoque: parseInt(newJewelry.estoque) || 0,
        imagem: newJewelry.imagem,
        descricao: newJewelry.descricao
      };
      setJewelry([...jewelry, jewelryItem]);
    }
  };

  return { joias: jewelry, adicionarJoia: addJewelry };
}; 