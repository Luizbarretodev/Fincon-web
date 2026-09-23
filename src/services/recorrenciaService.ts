import type { Recorrencia, CriarRecorrenciaRequest } from '../types/recorrencia';
import { apiFetch } from './apiClient';

export async function listarRecorrencias(): Promise<Recorrencia[]> {
  const response = await apiFetch('/Recorrencias', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao listar recorrencias');
  }

  return response.json();
}

export async function criarRecorrencia(request: CriarRecorrenciaRequest): Promise<Recorrencia> {
  const response = await apiFetch('/Recorrencias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar recorrencia');
  }

  return response.json();
}

export async function atualizarRecorrencia(id: string, request: CriarRecorrenciaRequest): Promise<Recorrencia> {
  const response = await apiFetch(`/Recorrencias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar recorrencia');
  }

  return response.json();
}

export async function excluirRecorrencia(id: string): Promise<void> {
  const response = await apiFetch(`/Recorrencias/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir recorrencia');
  }
}