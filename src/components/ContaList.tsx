import type { Conta } from '../types/conta';
import { excluirConta } from '../services/contaService';

interface ContaListProps {
  contas: Conta[];
  onContaAlterada: () => void;
}

function ContaList({ contas, onContaAlterada }: ContaListProps) {
  async function handleExcluir(id: string) {
    try {
      await excluirConta(id);
      onContaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <ul>
      {contas.map((conta) => (
        <li key={conta.id}>
          {conta.nome}
          <button onClick={() => handleExcluir(conta.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default ContaList;