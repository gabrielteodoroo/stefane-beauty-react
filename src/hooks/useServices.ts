import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../services/api';
import type { ServiceData } from '../schemas/service.schema';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => getServices().then(res => res.data),
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => getServiceById(id).then(res => res.data),
    enabled: !!id,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceData) => createService(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceData }) => updateService(id, data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteService(id).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });
} 