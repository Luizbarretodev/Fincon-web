import { Pencil, Trash2, Repeat } from 'lucide-react';
import type { Recorrencia } from '../../types/recorrencia';
import { excluirRecorrencia } from '../../services/recorrenciaService';
import { formatarMoeda, formatarData } from '../../utils/formatters';

interface RecorrenciaListProps {
  recorrencias: Recorrencia[];
  onRecorrenciaAlterada: () => void;
  onEditar: (recorrencia: Recorrencia) => void;
}

function RecorrenciaList({ recorrencias, onRecorrenciaAlterada, onEditar }: RecorrenciaListProps) {
  async function handleExcluir(id: string) {
    if (!window.confirm('Excluir esta recorrência?')) return;

    try {
      await excluirRecorrencia(id);
      onRecorrenciaAlterada();
    } catch (erro) {
      console.error(erro);
    }
  }

  if (recorrencias.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border border-dashed p-10 text-center">
        <Repeat className="mx-auto text-ink/30 mb-2" size={28} />
        <p className="text-ink/50 text-sm">Nenhuma recorrência cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-ink/50 bg-paper/60 border-b border-border">
            <th className="px-5 py-3 font-medium">Descrição</th>
            <th className="px-3 py-3 font-medium">Tipo</th>
            <th className="px-3 py-3 font-medium">Parcelas</th>
            <th className="px-3 py-3 font-medium">Início</th>
            <th className="px-3 py-3 font-medium text-right">Total</th>
            <th className="px-5 py-3 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {recorrencias.map((r) => {
            const ehEntrada = r.tipo === 'Entrada';
            return (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-paper/40 transition-colors">
                <td className="px-5 py-3 text-ink">{r.descricao}</td>
                <td className="px-3 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      ehEntrada ? 'bg-income/10 text-income' : 'bg-expense/10 text-expense'
                    }`}
                  >
                    {ehEntrada ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td className="px-3 py-3 text-ink/70">
                  {r.quantidadeParcelas}x de {formatarMoeda(r.valorParcela)}
                </td>
                <td className="px-3 py-3 text-ink/70">{formatarData(r.dataInicio)}</td>
                <td className={`px-3 py-3 text-right font-medium ${ehEntrada ? 'text-income' : 'text-expense'}`}>
                  {formatarMoeda(r.valorParcela * r.quantidadeParcelas)}
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEditar(r)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/50 hover:bg-paper hover:text-ink transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleExcluir(r.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-expense/60 hover:bg-expense/10 hover:text-expense transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RecorrenciaList;