import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getJewels,
  getJewelById,
  createJewel,
  updateJewel,
  deleteJewel,
} from '../services/api';
import type { JewelData } from '../schemas/jewel.schema';

export function useJewels() {
  return useQuery<JewelData[]>({
    queryKey: ['jewels'],
    queryFn: () => getJewels().then(res => res.data),
  });
}

export function useJewel(id: string) {
  return useQuery<JewelData>({
    queryKey: ['jewel', id],
    queryFn: () => getJewelById(id).then(res => res.data),
    enabled: !!id,
  });
}

export function useCreateJewel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => createJewel(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jewels'] }),
  });
}

export function useUpdateJewel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateJewel(id, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jewels'] }),
  });
}

export function useDeleteJewel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteJewel(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jewels'] }),
  });
} 