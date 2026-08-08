import { useState, useEffect } from 'react';
import { listarSaidas } from '../services/saidaService';
import type { Saida } from '../types/saida';
import SaidaForm from '../components/SaidaForm';
import SaidaList from '../components/SaidaList';

function SaidaPage() {
  const [saidas, setSaidas] = useState<Saida[]>([]);

  useEffect(() => {
    carregarSaidas();
  }, []);

  async function carregarSaidas() {
    const dados = await listarSaidas();
    setSaidas(dados);
  }

  return (
    <div>
      <h2>Saídas</h2>
      <SaidaForm onSaidaCriada={carregarSaidas} />
      <SaidaList saidas={saidas} />
    </div>
  );
}

export default SaidaPage;