import { useState, useEffect } from 'react';
import { criarConta, atualizarConta } from '../services/contaService';
import type { Conta } from '../types/conta';

interface ContaFormProps {
  contaEditando: Conta | null;
  onSalvar: () => void;
}

function ContaForm({ contaEditando, onSalvar }: ContaFormProps) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (contaEditando) {
      setNome(contaEditando.nome);
    } else {
      setNome('');
    }
  }, [contaEditando]);

  async function handleSubmit() {
    try {
      if (contaEditando) {
        await atualizarConta(contaEditando.id, { nome });
      } else {
        await criarConta({ nome });
      }
      setNome('');
      onSalvar();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da conta"
      />
      <button onClick={handleSubmit}>
        {contaEditando ? 'Salvar Edição' : 'Criar Conta'}
      </button>
    </div>
  );
}

export default ContaForm;