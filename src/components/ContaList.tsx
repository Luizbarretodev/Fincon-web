import type { Conta } from '../types/conta';

interface ContaListProps {
  contas: Conta[];
}

function ContaList({ contas }: ContaListProps) {
  return (
    <ul>
      {contas.map((conta) => (
        <li key={conta.id}>{conta.nome}</li>
      ))}
    </ul>
  );
}

export default ContaList;