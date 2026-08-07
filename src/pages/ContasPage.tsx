import { useState, useEffect } from 'react';
import { listarContas } from '../services/contaService';
import type { Conta } from '../types/conta';
import ContaForm from '../components/ContaForm';
import ContaList from '../components/ContaList';

function ContasPage() {
  const [contas, setContas] = useState<Conta[]>([]);

  useEffect(() => {
    carregarContas();
  }, []);

  async function carregarContas() {
    try {
      const dados = await listarContas();
      setContas(dados);
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div>
      <h2>Contas cadastradas</h2>
      <ContaForm onContaCriada={carregarContas} />
      <ContaList contas={contas} />
    </div>
  );
}

export default ContasPage;