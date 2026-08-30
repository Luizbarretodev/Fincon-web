import type { Saida, CriarSaidaRequest } from '../types/saida';
import { API_URL } from '../config/api';

export async function listarSaidas(): Promise<Saida[]> {
  const response = await fetch(`${API_URL}/Saidas`, {
    method: 'GET',
  });
 
  if (!response.ok) {
    throw new Error('Erro ao listar saidas');
  }

  return response.json();
}

export async function criarSaida(request: CriarSaidaRequest): Promise<Saida> {
  const response = await fetch(`${API_URL}/Saidas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar saida');
  }

  return response.json();
}

export async function atualizarSaida(id: string, request: CriarSaidaRequest): Promise<Saida> {
  const response = await fetch(`${API_URL}/Saidas/${id}`, {
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
  const response = await fetch(`${API_URL}/Saidas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao excluir saida');
  }
}