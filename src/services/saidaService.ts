import type { Saida, CriarSaidaRequest } from '../types/saida';
import { apiFetch } from './ApiClient';

export async function listarSaidas(): Promise<Saida[]> {
  const response = await apiFetch('/Saidas', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao listar saidas');
  }

  return response.json();
}

export async function criarSaida(request: CriarSaidaRequest): Promise<Saida> {
  const response = await apiFetch('/Saidas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar saida');
  }

  return response.json();
}

export async function atualizarSaida(id: string, request: CriarSaidaRequest): Promise<Saida> {
  const response = await apiFetch(`/Saidas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar saida');
  }

  return response.json();
}

export async function excluirSaida(id: string): Promise<void> {
  const response = await apiFetch(`/Saidas/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir saida');
  }
}