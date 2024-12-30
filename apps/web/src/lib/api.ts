import axios from 'axios';
import { Recipe, MealPlan, User } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const auth = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  getCurrentUser: () => api.get('/auth/me'),

  forgotPassword: (data: { email: string }) =>
    api.post('/auth/forgot-password', data),

  resetPassword: (data: { token: string; password: string }) =>
    api.post('/auth/reset-password', data),
};

// Recipes API
export const recipes = {
  create: (data: Partial<Recipe>) =>
    api.post<Recipe>('/recipes', data),
  
  getAll: (params?: { page?: number; limit?: number; search?: string; tags?: string[] }) =>
    api.get<{ recipes: Recipe[]; totalPages: number; currentPage: number }>('/recipes', { params }),
  
  getOne: (id: string) =>
    api.get<Recipe>(`/recipes/${id}`),
  
  update: (id: string, data: Partial<Recipe>) =>
    api.put<Recipe>(`/recipes/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/recipes/${id}`),
};

// Meal Plans API
export const mealPlans = {
  create: (data: Partial<MealPlan>) =>
    api.post<MealPlan>('/meal-plans', data),
  
  getAll: (params: { startDate: string; endDate: string }) =>
    api.get<MealPlan[]>('/meal-plans', { params }),
  
  getOne: (id: string) =>
    api.get<MealPlan>(`/meal-plans/${id}`),
  
  update: (id: string, data: Partial<MealPlan>) =>
    api.put<MealPlan>(`/meal-plans/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/meal-plans/${id}`),
};
