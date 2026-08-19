import type { CategoriaEntrada, CriarCategoriaEntradaRequest} from '../types/categoria';

import { API_URL } from '../config/api';

export async function listarCategoriasEntrada(): Promise<CategoriaEntrada[]> {
    const response = await fetch(`${API_URL}/CategoriasEntrada`, {
        method: 'GET'
    });

    if (!response.ok){
        throw new Error('Erro ao buscar categorias');
    }

    return response.json();
}

export async function criarCategoriaEntrada(request: CriarCategoriaEntradaRequest): Promise<CategoriaEntrada> {
    const response = await fetch(`${API_URL}/CategoriasEntrada`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok){
        throw new Error('Erro ao criar categoria');
    }

    return response.json();
}

export async function atualizarCategoriaEntrada(id: string, request: CriarCategoriaEntradaRequest): Promise<CategoriaEntrada> {
  const response = await fetch(`${API_URL}/CategoriasEntrada/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar categoria');
  }
  return response.json();
}

export async function excluirCategoriaEntrada(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/CategoriasEntrada/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao excluir categoria');
  }
}