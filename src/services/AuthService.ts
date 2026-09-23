import { API_URL } from '../config/api';
import type { RegistrarRequest } from '../types/auth';
import type { LoginRequest, LoginResponse } from '../types/auth';

export async function registrar(request: RegistrarRequest): Promise<void> {
  const response = await fetch(`${API_URL}/Auth/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao registrar');
  }
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/Auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Email ou senha inválidos');
  }

  return response.json();
}

export function salvarToken(token: string) {
  localStorage.setItem('fincon_token', token);
}

export function obterToken(): string | null {
  return localStorage.getItem('fincon_token');
}

export function removerToken() {
  localStorage.removeItem('fincon_token');
}