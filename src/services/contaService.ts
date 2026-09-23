import type { Conta, CriarContaRequest } from '../types/conta';
import { apiFetch } from './ApiClient';

export async function listarContas(): Promise<Conta[]> {
  const response = await apiFetch('/Contas', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao listar contas');
  }

  return response.json();
}

export async function criarConta(request: CriarContaRequest): Promise<Conta> {
  const response = await apiFetch('/Contas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar conta');
  }

  return response.json();
}

export async function atualizarConta(id: string, request: CriarContaRequest): Promise<Conta> {
  const response = await apiFetch(`/Contas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar conta');
  }

  return response.json();
}

export async function excluirConta(id: string): Promise<void> {
  const response = await apiFetch(`/Contas/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir conta');
  }
}