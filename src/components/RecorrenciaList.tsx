import type { Recorrencia } from '../types/recorrencia';

interface RecorrenciaListProps {
  recorrencias: Recorrencia[];
}

function RecorrenciaList({ recorrencias }: RecorrenciaListProps) {
  return (
    <ul>
      {recorrencias.map((recorrencia) => (
        <li key={recorrencia.id}>
          {recorrencia.descricao} — {recorrencia.quantidadeParcelas}x de R$ {recorrencia.valorParcela} ({recorrencia.tipo})
        </li>
      ))}
    </ul>
  );
}

export default RecorrenciaList;