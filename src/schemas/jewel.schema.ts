import { z } from 'zod';

export const jewelSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Nome obrigatório'),
  price: z.number().min(0, 'Preço obrigatório'),
  stock: z.number().min(0, 'Estoque obrigatório'),
  category: z.string().min(2, 'Categoria obrigatória'),
  material: z.string().min(2, 'Material obrigatório'),
  imageUrl: z.string().optional(),
  description: z.string().min(2, 'Descrição obrigatória'),
});

export type JewelData = z.infer<typeof jewelSchema>; 