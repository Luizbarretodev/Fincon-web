import { useState, useEffect } from 'react';
import { listarRecorrencias } from '../services/recorrenciaService';
import type { Recorrencia } from '../types/recorrencia';
import RecorrenciaForm from '../components/RecorrenciaForm';
import RecorrenciaList from '../components/RecorrenciaList';

function RecorrenciasPage() {
  const [recorrencias, setRecorrencias] = useState<Recorrencia[]>([]);
  const [recorrenciaEditando, setRecorrenciaEditando] = useState<Recorrencia | null>(null);

  useEffect(() => {
    carregarRecorrencias();
  }, []);

  async function carregarRecorrencias() {
    const dados = await listarRecorrencias();
    setRecorrencias(dados);
  }

  function handleSalvar() {
    setRecorrenciaEditando(null);
    carregarRecorrencias();
  }

  return (
    <div>
      <h2>Recorrências</h2>
      <RecorrenciaForm recorrenciaEditando={recorrenciaEditando} onSalvar={handleSalvar} />
      <RecorrenciaList recorrencias={recorrencias} onRecorrenciaAlterada={carregarRecorrencias} onEditar={setRecorrenciaEditando} />
    </div>
  );
}

export default RecorrenciasPage;