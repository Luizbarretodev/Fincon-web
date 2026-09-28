import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import {
  listarCategoriasEntrada,
  criarCategoriaEntrada,
  atualizarCategoriaEntrada,
  excluirCategoriaEntrada,
} from '../services/categoriaEntradaService';
import {
  listarCategoriasSaida,
  criarCategoriaSaida,
  atualizarCategoriaSaida,
  excluirCategoriaSaida,
} from '../services/categoriaSaidaService';
import PainelCategoria from '../components/PainelCategoria';
import type { CategoriaEntrada, CategoriaSaida } from '../types/categoria';

function CategoriasPage() {
  const [categoriasEntrada, setCategoriasEntrada] = useState<CategoriaEntrada[]>([]);
  const [categoriasSaida, setCategoriasSaida] = useState<CategoriaSaida[]>([]);

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    const [ce, cs] = await Promise.all([listarCategoriasEntrada(), listarCategoriasSaida()]);
    setCategoriasEntrada(ce);
    setCategoriasSaida(cs);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-semibold text-2xl text-ink">Categorias</h1>
      </div>

      <div className="flex gap-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-income/10 text-income flex items-center justify-center">
            <Plus size={16} />
          </div>
          <div>
            <p className="font-display font-semibold text-ink">{categoriasEntrada.length}</p>
            <p className="text-xs text-ink/50">categorias de receita</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-expense/10 text-expense flex items-center justify-center">
            <Minus size={16} />
          </div>
          <div>
            <p className="font-display font-semibold text-ink">{categoriasSaida.length}</p>
            <p className="text-xs text-ink/50">categorias de despesa</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <PainelCategoria
          titulo="Receitas"
          subtitulo="Dinheiro que entra"
          rotulo="Receita"
          cor="income"
          itens={categoriasEntrada}
          onCriar={async (nome) => { await criarCategoriaEntrada({ nome }); carregarTudo(); }}
          onAtualizar={async (id, nome) => { await atualizarCategoriaEntrada(id, { nome }); carregarTudo(); }}
          onExcluir={async (id) => { await excluirCategoriaEntrada(id); carregarTudo(); }}
        />

        <PainelCategoria
          titulo="Despesas"
          subtitulo="Dinheiro que sai"
          rotulo="Despesa"
          cor="expense"
          itens={categoriasSaida}
          onCriar={async (nome) => { await criarCategoriaSaida({ nome }); carregarTudo(); }}
          onAtualizar={async (id, nome) => { await atualizarCategoriaSaida(id, { nome }); carregarTudo(); }}
          onExcluir={async (id) => { await excluirCategoriaSaida(id); carregarTudo(); }}
        />
      </div>
    </div>
  );
}

export default CategoriasPage;