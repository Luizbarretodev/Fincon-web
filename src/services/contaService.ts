import type { Conta, CriarContaRequest } from '../types/conta';

const API_URL = 'https://localhost:7211/api';

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