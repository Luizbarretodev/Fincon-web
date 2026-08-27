import type { Saida } from '../types/saida';
import { excluirSaida } from '../services/saidaService';
import { formatarMoeda, formatarData } from '../utils/formatters';

interface SaidaListProps {
  saidas: Saida[];
  onSaidaAlterada: () => void;
  onEditar: (saida: Saida) => void;
}

function SaidaList({ saidas, onSaidaAlterada, onEditar }: SaidaListProps) {
  async function handleExcluir(id: string) {
    try {
      await excluirSaida(id);
      onSaidaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <ul>
      {saidas.map((saida) => (
        <li key={saida.id}>
          {saida.descricao} — {formatarMoeda(saida.valor)} — {formatarData(saida.data)}
          <button onClick={() => onEditar(saida)}>Editar</button>
          <button onClick={() => handleExcluir(saida.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default SaidaList;