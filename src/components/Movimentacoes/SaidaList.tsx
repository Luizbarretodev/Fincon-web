import { Pencil, Trash2, ArrowUpCircle } from 'lucide-react';
import type { Saida } from '../../types/saida';
import { excluirSaida } from '../../services/saidaService';
import { formatarMoeda, formatarData } from '../../utils/formatters';

interface SaidaListProps {
  saidas: Saida[];
  contasPorId: Record<string, string>;
  categoriasPorId: Record<string, string>;
  onSaidaAlterada: () => void;
  onEditar: (saida: Saida) => void;
}

function SaidaList({ saidas, contasPorId, categoriasPorId, onSaidaAlterada, onEditar }: SaidaListProps) {
  async function handleExcluir(id: string) {
    if (!window.confirm('Excluir esta saída?')) return;

    try {
      await excluirSaida(id);
      onSaidaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  const ordenadas = [...saidas].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  if (ordenadas.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border border-dashed p-10 text-center">
        <ArrowUpCircle className="mx-auto text-ink/30 mb-2" size={28} />
        <p className="text-ink/50 text-sm">Nenhuma saída cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-ink/50 bg-paper/60 border-b border-border">
            <th className="px-5 py-3 font-medium">Descrição</th>
            <th className="px-3 py-3 font-medium">Conta</th>
            <th className="px-3 py-3 font-medium">Categoria</th>
            <th className="px-3 py-3 font-medium">Data</th>
            <th className="px-3 py-3 font-medium text-right">Valor</th>
            <th className="px-5 py-3 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordenadas.map((saida) => (
            <tr key={saida.id} className="border-b border-border last:border-0 hover:bg-paper/40 transition-colors">
              <td className="px-5 py-3">
                <span className="text-ink">{saida.descricao}</span>
                {saida.status === 'Pendente' && (
                  <span className="ml-2 text-[11px] bg-gold/10 text-gold px-2 py-0.5 rounded-full">Pendente</span>
                )}
              </td>
              <td className="px-3 py-3 text-ink/70">{contasPorId[saida.contaId] ?? '—'}</td>
              <td className="px-3 py-3">
                <span className="text-xs bg-expense/10 text-expense px-2 py-0.5 rounded-full">
                  {categoriasPorId[saida.categoriaSaidaId] ?? '—'}
                </span>
              </td>
              <td className="px-3 py-3 text-ink/70">{formatarData(saida.data)}</td>
              <td className="px-3 py-3 text-right font-medium text-expense">- {formatarMoeda(saida.valor)}</td>
              <td className="px-5 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEditar(saida)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/50 hover:bg-paper hover:text-ink transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleExcluir(saida.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-expense/60 hover:bg-expense/10 hover:text-expense transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SaidaList;