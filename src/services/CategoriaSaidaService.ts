import type { CategoriaSaida, CriarCategoriaSaidaRequest} from '../types/categoria';

const API_URL = 'https://localhost:7211/api';

export async function listarCategoriasSaida(): Promise<CategoriaSaida[]> {
    const response = await fetch(`${API_URL}/CategoriasSaida`, {
        method: 'GET'
    });

    if (!response.ok){
        throw new Error('Erro ao buscar categorias');
    }

    return response.json();
}

export async function criarCategoriaSaida(request: CriarCategoriaSaidaRequest): Promise<CategoriaSaida> {
    const response = await fetch(`${API_URL}/CategoriasSaida`, {
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