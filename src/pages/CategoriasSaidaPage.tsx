import { useState, useEffect } from 'react';
import { listarCategoriasSaida } from '../services/CategoriaSaidaService';
import type { CategoriaSaida } from '../types/categoria';
import CategoriaSaidaForm from '../components/CategoriaSaida/CategoriaSaidaForm';
import CategoriaSaidaList from '../components/CategoriaSaida/CategoriaSaidaList';

function CategoriasSaidaPage() {
  const [categorias, setCategorias] = useState<CategoriaSaida[]>([]);
  const [categoriaEditando, setCategoriaEditando] = useState<CategoriaSaida | null>(null);

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    const dados = await listarCategoriasSaida();
    setCategorias(dados);
  }

  function handleSalvar() {
    setCategoriaEditando(null);
    carregarCategorias();
  }

  return (
    <div>
      <h2>Categorias de Saída cadastradas</h2>
      <CategoriaSaidaForm categoriaEditando={categoriaEditando} onSalvar={handleSalvar} />
      <CategoriaSaidaList categoriasSaida={categorias} onCategoriaSaidaAlterada={carregarCategorias} onEditar={setCategoriaEditando} />
    </div>
  );
}

export default CategoriasSaidaPage;