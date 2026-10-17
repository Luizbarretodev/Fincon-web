import { Pencil, Trash2, ArrowDownCircle } from 'lucide-react';
import type { Entrada } from '../../types/entrada';
import { excluirEntrada } from '../../services/entradaService';
import { formatarMoeda, formatarData } from '../../utils/formatters';

interface EntradaListProps {
  entradas: Entrada[];
  contasPorId: Record<string, string>;
  categoriasPorId: Record<string, string>;
  onEntradaAlterada: () => void;
  onEditar: (entrada: Entrada) => void;
}

function EntradaList({ entradas, contasPorId, categoriasPorId, onEntradaAlterada, onEditar }: EntradaListProps) {
  async function handleExcluir(id: string) {
    if (!window.confirm('Excluir esta entrada?')) return;

    try {
      await excluirEntrada(id);
      onEntradaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  const ordenadas = [...entradas].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  if (ordenadas.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border border-dashed p-10 text-center">
        <ArrowDownCircle className="mx-auto text-ink/30 mb-2" size={28} />
        <p className="text-ink/50 text-sm">Nenhuma entrada cadastrada ainda.</p>
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
          {ordenadas.map((entrada) => (
            <tr key={entrada.id} className="border-b border-border last:border-0 hover:bg-paper/40 transition-colors">
              <td className="px-5 py-3">
                <span className="text-ink">{entrada.descricao}</span>
                {entrada.status === 'Pendente' && (
                  <span className="ml-2 text-[11px] bg-gold/10 text-gold px-2 py-0.5 rounded-full">Pendente</span>
                )}
              </td>
              <td className="px-3 py-3 text-ink/70">{contasPorId[entrada.contaId] ?? '—'}</td>
              <td className="px-3 py-3">
                <span className="text-xs bg-income/10 text-income px-2 py-0.5 rounded-full">
                  {categoriasPorId[entrada.categoriaEntradaId] ?? '—'}
                </span>
              </td>
              <td className="px-3 py-3 text-ink/70">{formatarData(entrada.data)}</td>
              <td className="px-3 py-3 text-right font-medium text-income">+ {formatarMoeda(entrada.valor)}</td>
              <td className="px-5 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEditar(entrada)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/50 hover:bg-paper hover:text-ink transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleExcluir(entrada.id)}
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

export default EntradaList;