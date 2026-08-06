import type { StatusTransacao } from './enums';

export interface Saida {
    id: string;
    data: string;
    valor: number;
    descricao: string;
    status: StatusTransacao;
    contaId: string;
    categoriaSaidaId: string;
    recorrenciaId?: string;
} 

export interface CriarSaidaRequest {
    data: string;
    valor: number;
    descricao: string;
    status: StatusTransacao;
    contaId: string;
    categoriaSaidaId: string;
    recorrenciaId?: string;
}