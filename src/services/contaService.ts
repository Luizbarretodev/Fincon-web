import type { Conta, CriarContaRequest } from '../types/conta';

import { API_URL } from '../config/api';

export async function listarContas(): Promise<Conta[]> {
    const response = await fetch(`${API_URL}/Contas`, {
        method: 'GET'
    });

    if (!response.ok){
        throw new Error('Erro ao buscar contas');
    }

    return response.json();
}

export async function criarConta(request: CriarContaRequest): Promise<Conta> {
    const response = await fetch(`${API_URL}/Contas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok){
        throw new Error('Erro ao criar conta');
    }

    return response.json();
}

export async function atualizarConta(id: string, request: CriarContaRequest): Promise<Conta> {
  const response = await fetch(`${API_URL}/Contas/${id}`, {
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
  const response = await fetch(`${API_URL}/Contas/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir conta');
  }
}