import { useState, useEffect } from 'react';
import { criarCategoriaSaida, atualizarCategoriaSaida } from '../services/categoriaSaidaService';
import type { CategoriaSaida } from '../types/categoria';

interface CategoriaSaidaFormProps {
  categoriaEditando: CategoriaSaida | null;
  onSalvar: () => void;
}

function CategoriaSaidaForm({ categoriaEditando, onSalvar }: CategoriaSaidaFormProps) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    setNome(categoriaEditando ? categoriaEditando.nome : '');
  }, [categoriaEditando]);

  async function handleSubmit() {
    try {
      if (categoriaEditando) {
        await atualizarCategoriaSaida(categoriaEditando.id, { nome });
      } else {
        await criarCategoriaSaida({ nome });
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

export default CategoriaSaidaForm;