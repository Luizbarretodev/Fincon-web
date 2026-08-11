import { formatarMoeda } from '../utils/formatters';
import type { Entrada } from '../types/entrada';

interface EntradaListProps {
  entradas: Entrada[];
}

function EntradaList({ entradas }: EntradaListProps) {
  return (
    <ul>
      {entradas.map((entrada) => (
        <li key={entrada.id}>
          {entrada.descricao} — {formatarMoeda(entrada.valor)} — {entrada.data}
        </li>
      ))}
    </ul>
  );
}

export default EntradaList;