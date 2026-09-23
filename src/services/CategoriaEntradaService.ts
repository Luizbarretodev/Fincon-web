import type { CategoriaEntrada, CriarCategoriaEntradaRequest } from '../types/categoria';
import { apiFetch } from './ApiClient';

export async function listarCategoriasEntrada(): Promise<CategoriaEntrada[]> {
  const response = await apiFetch('/CategoriasEntrada', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }

  return response.json();
}

export async function criarCategoriaEntrada(request: CriarCategoriaEntradaRequest): Promise<CategoriaEntrada> {
  const response = await apiFetch('/CategoriasEntrada', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar categoria');
  }

  return response.json();
}

export async function atualizarCategoriaEntrada(id: string, request: CriarCategoriaEntradaRequest): Promise<CategoriaEntrada> {
  const response = await apiFetch(`/CategoriasEntrada/${id}`, {
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
  const response = await apiFetch(`/CategoriasEntrada/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir categoria');
  }
}