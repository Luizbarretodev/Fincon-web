import { useState, useEffect } from 'react';
import { listarSaidas } from '../services/saidaService';
import type { Saida } from '../types/saida';
import SaidaForm from '../components/SaidaForm';
import SaidaList from '../components/SaidaList';

function SaidasPage() {
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [saidaEditando, setSaidaEditando] = useState<Saida | null>(null);

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
      <SaidaForm saidaEditando={saidaEditando} onSalvar={handleSalvar} />
      <SaidaList saidas={saidas} onSaidaAlterada={carregarSaidas} onEditar={setSaidaEditando} />
    </div>
  );
}

export default SaidasPage;