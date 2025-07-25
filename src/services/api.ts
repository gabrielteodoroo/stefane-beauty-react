import axios from 'axios';
import type { ServiceData } from '../schemas/service.schema';
import type { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data: { name: string; email: string; password: string }) =>
  api.post('/users', data);
export const loginUser = (data: { email: string; password: string }) =>
  api.post('/login', data);

export const getJewels = () => api.get('/jewels');
export const getJewelById = (id: string) => api.get(`/jewels/${id}`);
export const createJewel = (data: FormData) => api.post('/jewels', data);
export const updateJewel = (id: string, data: FormData) => api.put(`/jewels/${id}`, data);
export const deleteJewel = (id: string) => api.delete(`/jewels/${id}`);

export const getServices = () => api.get('/services');
export const getServiceById = (id: string) => api.get(`/services/${id}`);
export const createService = (data: ServiceData) => api.post('/services', data);
export const updateService = (id: string, data: ServiceData) => api.put(`/services/${id}`, data);
export const deleteService = (id: string) => api.delete(`/services/${id}`);

export default api; 