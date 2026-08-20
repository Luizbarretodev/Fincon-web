import { useState, useEffect } from 'react';
import { criarCategoriaEntrada, atualizarCategoriaEntrada } from '../services/CategoriaEntradaService';
import type { CategoriaEntrada } from '../types/categoria';

interface CategoriaEntradaFormProps {
  categoriaEditando: CategoriaEntrada | null;
  onSalvar: () => void;
}

function CategoriaEntradaForm({ categoriaEditando, onSalvar }: CategoriaEntradaFormProps) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    setNome(categoriaEditando ? categoriaEditando.nome : '');
  }, [categoriaEditando]);

  async function handleSubmit() {
    try {
      if (categoriaEditando) {
        await atualizarCategoriaEntrada(categoriaEditando.id, { nome });
      } else {
        await criarCategoriaEntrada({ nome });
      }
      setNome('');
      onSalvar();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da categoria" />
      <button onClick={handleSubmit}>{categoriaEditando ? 'Salvar Edição' : 'Criar Categoria'}</button>
    </div>
  );
}

export default CategoriaEntradaForm;