import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Nome obrigatório'),
  description: z.string().min(2, 'Descrição obrigatória'),
  price: z.number().min(0, 'Preço obrigatório'),
  category: z.string().min(2, 'Categoria obrigatória'),
});

export type ServiceData = z.infer<typeof serviceSchema>; 