import type { Entrada, CriarEntradaRequest } from '../types/entrada';

import { API_URL } from '../config/api';

export async function listarEntradas(): Promise<Entrada[]> {
  const response = await fetch(`${API_URL}/Entradas`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao listar entradas');
  }

  return response.json();
}

export async function criarEntrada(request: CriarEntradaRequest): Promise<Entrada> {
  const response = await fetch(`${API_URL}/Entradas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar entrada');
  }

  return response.json();
}

export async function atualizarEntrada(id: string, request: CriarEntradaRequest): Promise<Entrada> {
  const response = await fetch(`${API_URL}/Entradas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar entrada');
  }
  return response.json();
}

export async function excluirEntrada(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/Entradas/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao excluir entrada');
  }
}