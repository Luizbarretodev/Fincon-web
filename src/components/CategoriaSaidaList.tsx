import type { CategoriaSaida } from '../types/categoria';
import { excluirCategoriaSaida } from '../services/categoriaSaidaService';

interface CategoriaSaidaListProps {
  categoriasSaida: CategoriaSaida[];
  onCategoriaSaidaAlterada: () => void;
  onEditar: (categoria: CategoriaSaida) => void;
}

function CategoriaSaidaList({ categoriasSaida, onCategoriaSaidaAlterada, onEditar }: CategoriaSaidaListProps) {
  async function handleExcluir(id: string) {
    try {
      await excluirCategoriaSaida(id);
      onCategoriaSaidaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <ul>
      {categoriasSaida.map((categoria) => (
        <li key={categoria.id}>
          {categoria.nome}
          <button onClick={() => onEditar(categoria)}>Editar</button>
          <button onClick={() => handleExcluir(categoria.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default CategoriaSaidaList;