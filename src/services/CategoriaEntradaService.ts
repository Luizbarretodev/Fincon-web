import type { CategoriaEntrada, CriarCategoriaEntradaRequest} from '../types/categoria';

const API_URL = 'https://localhost:7211/api';

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