import { useState, useEffect } from 'react';
import { criarConta, listarContas } from './services/contaService';
import type { Conta } from './types/conta';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
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

  async function handleCriarConta() {
    try {
      await criarConta({ nome });
      setNome('');
      await carregarContas();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div>
      <h1>Fincon</h1>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da conta"
      />
      <button onClick={handleCriarConta}>Criar Conta</button>

      <h2>Contas cadastradas</h2>
      <ul>
        {contas.map((conta) => (
          <li key={conta.id}>{conta.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;