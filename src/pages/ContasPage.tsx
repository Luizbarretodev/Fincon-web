import { useState, useEffect } from 'react';
import { listarContas } from '../services/contaService';
import type { Conta } from '../types/conta';
import ContaForm from '../components/ContaForm';
import ContaList from '../components/ContaList';

function ContasPage() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [contaEditando, setContaEditando] = useState<Conta | null>(null);

  useEffect(() => {
    carregarContas();
  }, []);

  async function carregarContas() {
    const dados = await listarContas();
    setContas(dados);
  }

  function handleSalvar() {
    setContaEditando(null);
    carregarContas();
  }

  return (
    <div>
      <h2>Contas cadastradas</h2>
      <ContaForm contaEditando={contaEditando} onSalvar={handleSalvar} />
      <ContaList contas={contas} onContaAlterada={carregarContas} onEditar={setContaEditando} />
    </div>
  );
}

export default ContasPage;