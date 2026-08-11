import { formatarMoeda } from '../utils/formatters';
import { formatarData } from '../utils/formatters';
import type { Entrada } from '../types/entrada';

interface EntradaListProps {
  entradas: Entrada[];
}

function EntradaList({ entradas }: EntradaListProps) {
  return (
    <ul>
      {entradas.map((entrada) => (
        <li key={entrada.id}>
          {entrada.descricao} — {formatarMoeda(entrada.valor)} — {formatarData(entrada.data)}
        </li>
      ))}
    </ul>
  );
}

export default EntradaList;