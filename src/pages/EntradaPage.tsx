import { useState, useEffect } from 'react';
import { listarEntradas } from '../services/entradaService';
import type { Entrada } from '../types/entrada';
import EntradaForm from '../components/EntradaForm';
import EntradaList from '../components/EntradaList';

function EntradaPage() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  useEffect(() => {
    carregarEntradas();
  }, []);

  async function carregarEntradas() {
    const dados = await listarEntradas();
    setEntradas(dados);
  }

  return (
    <div>
      <h2>Entradas</h2>
      <EntradaForm onEntradaCriada={carregarEntradas} />
      <EntradaList entradas={entradas} />
    </div>
  );
}

export default EntradaPage;