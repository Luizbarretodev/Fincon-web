import { formatarMoeda } from '../utils/formatters';
import { formatarData } from '../utils/formatters';
import type { Saida } from '../types/saida';

interface SaidaListProps {
  saidas: Saida[];
}

function SaidaList({ saidas }: SaidaListProps) {
  return (
    <ul>
      {saidas.map((saida) => (
        <li key={saida.id}>
          {saida.descricao} — {formatarMoeda(saida.valor)} — {formatarData(saida.data)}
        </li>
      ))}
    </ul>
  );
}

export default SaidaList;