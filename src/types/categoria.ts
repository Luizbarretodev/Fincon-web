export interface CategoriaEntrada {
    id: string;
    nome: string;
}

export interface CategoriaSaida {
    id: string;
    nome: string;
}

export interface CriarCategoriaEntradaRequest {
  nome: string;
}

export interface CriarCategoriaSaidaRequest {
  nome: string;
}