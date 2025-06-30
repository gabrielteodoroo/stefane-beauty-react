export interface Joia {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  material: string;
  estoque: number;
  imagem: string;
  descricao: string;
}

export interface NovaJoia {
  nome: string;
  preco: string;
  categoria: string;
  material: string;
  estoque: string;
  imagem: string;
  descricao: string;
}

export interface Categoria {
  id: string;
  nome: string;
}

export interface Servico {
  titulo: string;
  desc: string;
  icone: string;
}

export type PageType = 'home' | 'catalogo' | 'cuidados'; 