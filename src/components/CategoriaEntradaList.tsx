import type { CategoriaEntrada } from '../types/categoria';
import { excluirCategoriaEntrada } from '../services/CategoriaEntradaService';

interface CategoriaEntradaListProps {
  categoriasEntrada: CategoriaEntrada[];
  onCategoriaEntradaAlterada: () => void;
  onEditar: (categoria: CategoriaEntrada) => void;
}

function CategoriaEntradaList({ categoriasEntrada, onCategoriaEntradaAlterada, onEditar }: CategoriaEntradaListProps) {
  async function handleExcluir(id: string) {
    try {
      await excluirCategoriaEntrada(id);
      onCategoriaEntradaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <ul>
      {categoriasEntrada.map((categoria) => (
        <li key={categoria.id}>
          {categoria.nome}
          <button onClick={() => onEditar(categoria)}>Editar</button>
          <button onClick={() => handleExcluir(categoria.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default CategoriaEntradaList;