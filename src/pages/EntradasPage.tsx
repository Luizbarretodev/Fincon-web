import { useState, useEffect } from 'react';
import { listarEntradas } from '../services/entradaService';
import type { Entrada } from '../types/entrada';
import EntradaForm from '../components/EntradaForm';
import EntradaList from '../components/EntradaList';

function EntradasPage() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [entradaEditando, setEntradaEditando] = useState<Entrada | null>(null);

  useEffect(() => {
    carregarEntradas();
  },  []);

  async function carregarEntradas() {
    const dados = await listarEntradas();
    setEntradas(dados);
  }

  function handleSalvar() {
    setEntradaEditando(null);
    carregarEntradas();
  }

  return (
    <div>
      <h2>Entradas</h2>
      <EntradaForm entradaEditando={entradaEditando} onSalvar={handleSalvar} />
      <EntradaList entradas={entradas} onEntradaAlterada={carregarEntradas} onEditar={setEntradaEditando} />
    </div>
  );
}

export default EntradasPage;