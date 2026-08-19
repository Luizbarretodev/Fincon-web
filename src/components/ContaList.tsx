import type { Conta } from '../types/conta';
import { excluirConta } from '../services/contaService';

interface ContaListProps {
  contas: Conta[];
  onContaAlterada: () => void;
  onEditar: (conta: Conta) => void;
}

function ContaList({ contas, onContaAlterada, onEditar }: ContaListProps) {
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
          <button onClick={() => onEditar(conta)}>Editar</button>
          <button onClick={() => handleExcluir(conta.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default ContaList;