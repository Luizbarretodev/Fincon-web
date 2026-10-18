import { useState, useEffect } from 'react';
import { criarRecorrencia, atualizarRecorrencia } from '../../services/recorrenciaService';
import type { Recorrencia } from '../../types/recorrencia';
import type { TipoRecorrencia } from '../../types/enums';

interface RecorrenciaFormProps {
  recorrenciaEditando: Recorrencia | null;
  onSalvar: () => void;
  onFechar?: () => void;
}

const inputClass =
  'w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold';
const labelClass = 'text-xs text-ink/60 mb-1 block';

function RecorrenciaForm({ recorrenciaEditando, onSalvar, onFechar }: RecorrenciaFormProps) {
  const [descricao, setDescricao] = useState('');
  const [valorParcela, setValorParcela] = useState('');
  const [quantidadeParcelas, setQuantidadeParcelas] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [tipo, setTipo] = useState<TipoRecorrencia>('Saida');

  useEffect(() => {
    if (recorrenciaEditando) {
      setDescricao(recorrenciaEditando.descricao);
      setValorParcela(String(recorrenciaEditando.valorParcela));
      setQuantidadeParcelas(String(recorrenciaEditando.quantidadeParcelas));
      setDataInicio(recorrenciaEditando.dataInicio.split('T')[0]);
      setTipo(recorrenciaEditando.tipo);
    } else {
      setDescricao('');
      setValorParcela('');
      setQuantidadeParcelas('');
      setDataInicio('');
      setTipo('Saida');
    }
  }, [recorrenciaEditando]);

  async function handleSubmit() {
    try {
      const request = {
        descricao,
        valorParcela: Number(valorParcela),
        quantidadeParcelas: Number(quantidadeParcelas),
        dataInicio,
        tipo,
      };

      if (recorrenciaEditando) {
        await atualizarRecorrencia(recorrenciaEditando.id, request);
      } else {
        await criarRecorrencia(request);
      }

      onSalvar();
      onFechar?.();
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Financiamento, assinatura..."
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Valor da parcela</label>
          <input
            type="number"
            value={valorParcela}
            onChange={(e) => setValorParcela(e.target.value)}
            placeholder="0,00"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Nº de parcelas</label>
          <input
            type="number"
            value={quantidadeParcelas}
            onChange={(e) => setQuantidadeParcelas(e.target.value)}
            placeholder="12"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Data de início</label>
        <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Tipo</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTipo('Saida')}
            className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
              tipo === 'Saida'
                ? 'bg-expense/10 border-expense text-expense font-medium'
                : 'border-border text-ink/50 hover:border-ink/20'
            }`}
          >
            Saída
          </button>
          <button
            type="button"
            onClick={() => setTipo('Entrada')}
            className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
              tipo === 'Entrada'
                ? 'bg-income/10 border-income text-income font-medium'
                : 'border-border text-ink/50 hover:border-ink/20'
            }`}
          >
            Entrada
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-ink text-white text-sm font-medium py-2.5 rounded-lg hover:bg-ink/90 transition-colors mt-2"
      >
        {recorrenciaEditando ? 'Salvar edição' : 'Adicionar recorrência'}
      </button>
    </div>
  );
}

export default RecorrenciaForm;