import type { TipoRecorrencia } from './enums';

export interface Recorrencia {
  id: string;
  descricao: string;
  valorParcela: number;
  quantidadeParcelas: number;
  dataInicio: string;
  tipo: TipoRecorrencia;
}

export interface CriarRecorrenciaRequest {
  descricao: string;
  valorParcela: number;
  quantidadeParcelas: number;
  dataInicio: string;
  tipo: TipoRecorrencia;
}