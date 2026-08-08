import type { Saida } from '../types/saida';

interface SaidaListProps {
  saidas: Saida[];
}

function SaidaList({ saidas }: SaidaListProps) {
  return (
    <ul>
      {saidas.map((saida) => (
        <li key={saida.id}>
          {saida.descricao} — R$ {saida.valor} — {saida.data}
        </li>
      ))}
    </ul>
  );
}

export default SaidaList;