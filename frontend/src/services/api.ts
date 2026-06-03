import axios from 'axios';

// Intercepta requisições e injeta a URL do Render quando em produção, ou o localhost em testes
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
});