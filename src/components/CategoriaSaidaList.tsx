import type { CategoriaSaida } from '../types/categoria';

interface CategoriaSaidaListProps {
  categoriasSaida: CategoriaSaida[];
}

function CategoriaSaidaList({ categoriasSaida }: CategoriaSaidaListProps) {
  return (
    <ul>
      {categoriasSaida.map((categoriaSaida) => (
        <li key={categoriaSaida.id}>{categoriaSaida.nome}</li>
      ))}
    </ul>
  );
}

export default CategoriaSaidaList;