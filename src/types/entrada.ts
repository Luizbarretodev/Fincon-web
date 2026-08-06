import type { StatusTransacao } from './enums';

export interface Entrada {
    id: string;
    data: string;
    valor: number;
    descricao: string;
    status: StatusTransacao;
    contaId: string;
    categoriaEntradaId: string;
    recorrenciaId?: string;
}

export interface CriarEntradaRequest {
    data: string;
    valor: number;
    descricao: string;
    status: StatusTransacao;
    contaId: string;
    categoriaEntradaId: string;
    recorrenciaId?: string;
}