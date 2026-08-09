import { useState, useEffect } from 'react';
import { listarRecorrencias } from '../services/recorrenciaService';
import type { Recorrencia } from '../types/recorrencia';
import RecorrenciaForm from '../components/RecorrenciaForm';
import RecorrenciaList from '../components/RecorrenciaList';

function RecorrenciasPage() {
  const [recorrencias, setRecorrencias] = useState<Recorrencia[]>([]);

  useEffect(() => {
    carregarRecorrencias();
  }, []);

  async function carregarRecorrencias() {
    const dados = await listarRecorrencias();
    setRecorrencias(dados);
  }

  return (
    <div>
      <h2>Recorrências</h2>
      <RecorrenciaForm onRecorrenciaCriada={carregarRecorrencias} />
      <RecorrenciaList recorrencias={recorrencias} />
    </div>
  );
}

export default RecorrenciasPage;