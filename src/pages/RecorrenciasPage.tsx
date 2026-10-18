import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { listarRecorrencias } from '../services/recorrenciaService';
import { formatarMoeda } from '../utils/formatters';
import Modal from '../components/Modal';
import RecorrenciaForm from '../components/Recorrencia/RecorrenciaForm';
import RecorrenciaList from '../components/Recorrencia/RecorrenciaList';
import type { Recorrencia } from '../types/recorrencia';

function RecorrenciasPage() {
  const [recorrencias, setRecorrencias] = useState<Recorrencia[]>([]);
  const [recorrenciaEditando, setRecorrenciaEditando] = useState<Recorrencia | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await listarRecorrencias();
    setRecorrencias(dados);
  }

  function abrirNova() {
    setRecorrenciaEditando(null);
    setModalAberto(true);
  }

  function abrirEdicao(recorrencia: Recorrencia) {
    setRecorrenciaEditando(recorrencia);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setRecorrenciaEditando(null);
  }

  const parcelasMensaisSaida = recorrencias
    .filter((r) => r.tipo === 'Saida')
    .reduce((soma, r) => soma + r.valorParcela, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink">Recorrências</h1>
          <p className="text-ink/60 text-sm mt-1">Parcelas e lançamentos que se repetem todo mês.</p>
        </div>
        <button
          onClick={abrirNova}
          className="flex items-center gap-2 bg-ink text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors"
        >
          <Plus size={16} />
          Nova recorrência
        </button>
      </div>

      <div className="flex gap-8 bg-white rounded-xl border border-border px-5 py-4">
        <div>
          <p className="font-display font-semibold text-ink">{recorrencias.length}</p>
          <p className="text-xs text-ink/50">recorrência(s)</p>
        </div>
        <div>
          <p className="font-display font-semibold text-expense">{formatarMoeda(parcelasMensaisSaida)}</p>
          <p className="text-xs text-ink/50">em parcelas de saída por mês</p>
        </div>
      </div>

      <RecorrenciaList
        recorrencias={recorrencias}
        onRecorrenciaAlterada={carregar}
        onEditar={abrirEdicao}
      />

      <Modal
        titulo={recorrenciaEditando ? 'Editar recorrência' : 'Nova recorrência'}
        aberto={modalAberto}
        onFechar={fecharModal}
      >
        <RecorrenciaForm
          recorrenciaEditando={recorrenciaEditando}
          onSalvar={carregar}
          onFechar={fecharModal}
        />
      </Modal>
    </div>
  );
}

export default RecorrenciasPage;