import { useState, useEffect } from 'react';
import { listarEntradas } from '../services/entradaService';
import { listarSaidas } from '../services/saidaService';
import type { Entrada } from '../types/entrada';
import type { Saida } from '../types/saida';

function DashboardPage() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [dadosEntradas, dadosSaidas] = await Promise.all([
        listarEntradas(),
        listarSaidas(),
      ]);
      setEntradas(dadosEntradas);
      setSaidas(dadosSaidas);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  const totalReceitas = entradas.reduce((soma, entrada) => soma + entrada.valor, 0);
  const totalDespesas = saidas.reduce((soma, saida) => soma + saida.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
          <p>Receita</p>
          <h2>R$ {totalReceitas.toFixed(2)}</h2>
          <small>{entradas.length} entradas</small>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
          <p>Despesas</p>
          <h2>R$ {totalDespesas.toFixed(2)}</h2>
          <small>{saidas.length} saídas</small>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
          <p>Saldo</p>
          <h2>R$ {saldo.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;