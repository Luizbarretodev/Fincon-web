import { API_URL } from '../config/api';
import { obterToken } from './authService';

export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = obterToken();

  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}