import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { listarSaidas } from '../services/saidaService';
import { listarContas } from '../services/contaService';
import { listarCategoriasSaida } from '../services/categoriaSaidaService';
import { formatarMoeda } from '../utils/formatters';
import Modal from '../components/Modal';
import SaidaForm from '../components/Movimentacoes/SaidaForm';
import SaidaList from '../components/Movimentacoes/SaidaList';
import type { Saida } from '../types/saida';
import type { Conta } from '../types/conta';
import type { CategoriaSaida } from '../types/categoria';

function SaidasPage() {
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [categorias, setCategorias] = useState<CategoriaSaida[]>([]);
  const [saidaEditando, setSaidaEditando] = useState<Saida | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    const [s, c, cat] = await Promise.all([
      listarSaidas(),
      listarContas(),
      listarCategoriasSaida(),
    ]);
    setSaidas(s);
    setContas(c);
    setCategorias(cat);
  }

  function abrirNova() {
    setSaidaEditando(null);
    setModalAberto(true);
  }

  function abrirEdicao(saida: Saida) {
    setSaidaEditando(saida);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setSaidaEditando(null);
  }

  const contasPorId = Object.fromEntries(contas.map((c) => [c.id, c.nome]));
  const categoriasPorId = Object.fromEntries(categorias.map((c) => [c.id, c.nome]));
  const total = saidas.reduce((soma, s) => soma + s.valor, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink">Saídas</h1>
          <p className="text-ink/60 text-sm mt-1">Todo o dinheiro que sai das suas contas.</p>
        </div>
        <button
          onClick={abrirNova}
          className="flex items-center gap-2 bg-expense text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-expense/90 transition-colors"
        >
          <Plus size={16} />
          Nova saída
        </button>
      </div>

      <div className="flex gap-8 bg-white rounded-xl border border-border px-5 py-4">
        <div>
          <p className="font-display font-semibold text-ink">{saidas.length}</p>
          <p className="text-xs text-ink/50">lançamento(s)</p>
        </div>
        <div>
          <p className="font-display font-semibold text-expense">{formatarMoeda(total)}</p>
          <p className="text-xs text-ink/50">total gasto</p>
        </div>
      </div>

      <SaidaList
        saidas={saidas}
        contasPorId={contasPorId}
        categoriasPorId={categoriasPorId}
        onSaidaAlterada={carregarTudo}
        onEditar={abrirEdicao}
      />

      <Modal
        titulo={saidaEditando ? 'Editar saída' : 'Nova saída'}
        aberto={modalAberto}
        onFechar={fecharModal}
      >
        <SaidaForm
          saidaEditando={saidaEditando}
          onSalvar={carregarTudo}
          onFechar={fecharModal}
        />
      </Modal>
    </div>
  );
}

export default SaidasPage;