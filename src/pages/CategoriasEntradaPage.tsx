import { useState, useEffect } from 'react';
import { listarCategoriasEntrada } from '../services/categoriaEntradaService';
import type { CategoriaEntrada } from '../types/categoria';
import CategoriaEntradaForm from '../components/CategoriaEntradaForm';
import CategoriaEntradaList from '../components/CategoriaEntradaList';

function CategoriasEntradaPage() {
  const [categorias, setCategorias] = useState<CategoriaEntrada[]>([]);
  const [categoriaEditando, setCategoriaEditando] = useState<CategoriaEntrada | null>(null);

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    const dados = await listarCategoriasEntrada();
    setCategorias(dados);
  }

  function handleSalvar() {
    setCategoriaEditando(null);
    carregarCategorias();
  }

  return (
    <div>
      <h2>Categorias de Entrada cadastradas</h2>
      <CategoriaEntradaForm categoriaEditando={categoriaEditando} onSalvar={handleSalvar} />
      <CategoriaEntradaList categoriasEntrada={categorias} onCategoriaEntradaAlterada={carregarCategorias} onEditar={setCategoriaEditando} />
    </div>
  );
}

export default CategoriasEntradaPage;