import type { Recorrencia } from '../types/recorrencia';
import { excluirRecorrencia } from '../services/recorrenciaService';

interface RecorrenciaListProps {
  recorrencias: Recorrencia[];
  onRecorrenciaAlterada: () => void;
  onEditar: (recorrencia: Recorrencia) => void;
}

function RecorrenciaList({ recorrencias, onRecorrenciaAlterada, onEditar }: RecorrenciaListProps) {
  async function handleExcluir(id: string) {
    try {
      await excluirRecorrencia(id);
      onRecorrenciaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <ul>
      {recorrencias.map((recorrencia) => (
        <li key={recorrencia.id}>
          {recorrencia.descricao} — {recorrencia.quantidadeParcelas}x de R$ {recorrencia.valorParcela} ({recorrencia.tipo})
          <button onClick={() => onEditar(recorrencia)}>Editar</button>
          <button onClick={() => handleExcluir(recorrencia.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default RecorrenciaList;