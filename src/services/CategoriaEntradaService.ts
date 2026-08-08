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