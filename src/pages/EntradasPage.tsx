import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { listarEntradas } from '../services/entradaService';
import { listarContas } from '../services/contaService';
import { listarCategoriasEntrada } from '../services/categoriaEntradaService';
import { formatarMoeda } from '../utils/formatters';
import Modal from '../components/Modal';
import EntradaForm from '../components/Movimentacoes/EntradaForm';
import EntradaList from '../components/Movimentacoes/EntradaList';
import type { Entrada } from '../types/entrada';
import type { Conta } from '../types/conta';
import type { CategoriaEntrada } from '../types/categoria';

function EntradasPage() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [categorias, setCategorias] = useState<CategoriaEntrada[]>([]);
  const [entradaEditando, setEntradaEditando] = useState<Entrada | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    const [e, c, cat] = await Promise.all([
      listarEntradas(),
      listarContas(),
      listarCategoriasEntrada(),
    ]);
    setEntradas(e);
    setContas(c);
    setCategorias(cat);
  }

  function abrirNova() {
    setEntradaEditando(null);
    setModalAberto(true);
  }

  function abrirEdicao(entrada: Entrada) {
    setEntradaEditando(entrada);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEntradaEditando(null);
  }

  const contasPorId = Object.fromEntries(contas.map((c) => [c.id, c.nome]));
  const categoriasPorId = Object.fromEntries(categorias.map((c) => [c.id, c.nome]));
  const total = entradas.reduce((soma, e) => soma + e.valor, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink">Entradas</h1>
          <p className="text-ink/60 text-sm mt-1">Todo o dinheiro que entra nas suas contas.</p>
        </div>
        <button
          onClick={abrirNova}
          className="flex items-center gap-2 bg-income text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-income/90 transition-colors"
        >
          <Plus size={16} />
          Nova entrada
        </button>
      </div>

      <div className="flex gap-8 bg-white rounded-xl border border-border px-5 py-4">
        <div>
          <p className="font-display font-semibold text-ink">{entradas.length}</p>
          <p className="text-xs text-ink/50">lançamento(s)</p>
        </div>
        <div>
          <p className="font-display font-semibold text-income">{formatarMoeda(total)}</p>
          <p className="text-xs text-ink/50">total recebido</p>
        </div>
      </div>

      <EntradaList
        entradas={entradas}
        contasPorId={contasPorId}
        categoriasPorId={categoriasPorId}
        onEntradaAlterada={carregarTudo}
        onEditar={abrirEdicao}
      />

      <Modal
        titulo={entradaEditando ? 'Editar entrada' : 'Nova entrada'}
        aberto={modalAberto}
        onFechar={fecharModal}
      >
        <EntradaForm
          entradaEditando={entradaEditando}
          onSalvar={carregarTudo}
          onFechar={fecharModal}
        />
      </Modal>
    </div>
  );
}

export default EntradasPage;