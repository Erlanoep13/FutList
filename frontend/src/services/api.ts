import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// Intercepta a requisição antes de enviá-la ao servidor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@FutList:token');

  // Se o token existir, injeta no cabeçalho de Autorização
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});