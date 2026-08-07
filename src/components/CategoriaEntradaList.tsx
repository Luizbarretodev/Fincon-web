import type { CategoriaEntrada } from '../types/categoria';

interface CategoriaEntradaListProps {
  categoriasEntrada: CategoriaEntrada[];
}

function CategoriaEntradaList({ categoriasEntrada }: CategoriaEntradaListProps) {
  return (
    <ul>
      {categoriasEntrada.map((categoriaEntrada) => (
        <li key={categoriaEntrada.id}>{categoriaEntrada.nome}</li>
      ))}
    </ul>
  );
}

export default CategoriaEntradaList;