import type { Entrada } from '../types/entrada';
import { excluirEntrada } from '../services/entradaService';
import { formatarMoeda, formatarData } from '../utils/formatters';

interface EntradaListProps {
  entradas: Entrada[];
  onEntradaAlterada: () => void;
  onEditar: (entrada: Entrada) => void;
}

function EntradaList({ entradas, onEntradaAlterada, onEditar }: EntradaListProps) {
  async function handleExcluir(id: string) {
    try {
      await excluirEntrada(id);
      onEntradaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <ul>
      {entradas.map((entrada) => (
        <li key={entrada.id}>
          {entrada.descricao} — {formatarMoeda(entrada.valor)} — {formatarData(entrada.data)}
          <button onClick={() => onEditar(entrada)}>Editar</button>
          <button onClick={() => handleExcluir(entrada.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default EntradaList;