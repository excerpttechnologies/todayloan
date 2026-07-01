import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: () => apiClient.get('/api/products'),
  getById: (id: string) => apiClient.get(`/api/products/${id}`),
  create: (data: any) => apiClient.post('/api/products', data),
  update: (id: string, data: any) => apiClient.put(`/api/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/products/${id}`),
};

// Blogs API
export const blogsAPI = {
  getAll: (page?: number) => apiClient.get('/api/blogs', { params: { page } }),
  getById: (id: string) => apiClient.get(`/api/blogs/${id}`),
  create: (data: any) => apiClient.post('/api/blogs', data),
  update: (id: string, data: any) => apiClient.put(`/api/blogs/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/blogs/${id}`),
};

// Contact Form
export const contactAPI = {
  submit: (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  }) => apiClient.post('/api/contact', data),
};

// Datasheet Requests
export const datasheetAPI = {
  request: (data: {
    productId: string;
    name: string;
    email: string;
    company?: string;
  }) => apiClient.post('/api/datasheets', data),
};

// Careers
export const careersAPI = {
  getJobs: () => apiClient.get('/api/careers/jobs'),
  apply: (data: FormData) => apiClient.post('/api/careers/apply', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Search
export const searchAPI = {
  query: (q: string) => apiClient.get('/api/search', { params: { q } }),
};

export default apiClient;
