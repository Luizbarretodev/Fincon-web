import { useState, useEffect } from 'react';
import { criarSaida, atualizarSaida } from '../../services/saidaService';
import { listarContas } from '../../services/contaService';
import { listarCategoriasSaida } from '../../services/categoriaSaidaService';
import type { Saida } from '../../types/saida';
import type { Conta } from '../../types/conta';
import type { CategoriaSaida } from '../../types/categoria';
import type { StatusTransacao } from '../../types/enums';

interface SaidaFormProps {
  saidaEditando: Saida | null;
  onSalvar: () => void;
  onFechar?: () => void;
}

const inputClass =
  'w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold';
const labelClass = 'text-xs text-ink/60 mb-1 block';

function SaidaForm({ saidaEditando, onSalvar, onFechar }: SaidaFormProps) {
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<StatusTransacao>('Confirmada');
  const [contaId, setContaId] = useState('');
  const [categoriaSaidaId, setCategoriaSaidaId] = useState('');

  const [contas, setContas] = useState<Conta[]>([]);
  const [categorias, setCategorias] = useState<CategoriaSaida[]>([]);

  useEffect(() => {
    listarContas().then(setContas);
  }, []);

  useEffect(() => {
    listarCategoriasSaida().then(setCategorias);
  }, []);

  useEffect(() => {
    if (saidaEditando) {
      setData(saidaEditando.data.split('T')[0]);
      setValor(String(saidaEditando.valor));
      setDescricao(saidaEditando.descricao);
      setStatus(saidaEditando.status);
      setContaId(saidaEditando.contaId);
      setCategoriaSaidaId(saidaEditando.categoriaSaidaId);
    } else {
      setData('');
      setValor('');
      setDescricao('');
      setContaId('');
      setCategoriaSaidaId('');
    }
  }, [saidaEditando]);

  async function handleSubmit() {
    try {
      const request = { data, valor: Number(valor), descricao, status, contaId, categoriaSaidaId };

      if (saidaEditando) {
        await atualizarSaida(saidaEditando.id, request);
      } else {
        await criarSaida(request);
      }

      setData('');
      setValor('');
      setDescricao('');
      setContaId('');
      setCategoriaSaidaId('');
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
          placeholder="Ex: Mercado, conta de luz..."
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Data</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Valor</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0,00"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Conta</label>
          <select value={contaId} onChange={(e) => setContaId(e.target.value)} className={inputClass}>
            <option value="">Selecione</option>
            {contas.map((conta) => (
              <option key={conta.id} value={conta.id}>{conta.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Categoria</label>
          <select value={categoriaSaidaId} onChange={(e) => setCategoriaSaidaId(e.target.value)} className={inputClass}>
            <option value="">Selecione</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStatus('Confirmada')}
            className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
              status === 'Confirmada'
                ? 'bg-expense/10 border-expense text-expense font-medium'
                : 'border-border text-ink/50 hover:border-ink/20'
            }`}
          >
            Confirmada
          </button>
          <button
            type="button"
            onClick={() => setStatus('Pendente')}
            className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
              status === 'Pendente'
                ? 'bg-gold/10 border-gold text-gold font-medium'
                : 'border-border text-ink/50 hover:border-ink/20'
            }`}
          >
            Pendente
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-expense text-white text-sm font-medium py-2.5 rounded-lg hover:bg-expense/90 transition-colors mt-2"
      >
        {saidaEditando ? 'Salvar edição' : 'Adicionar saída'}
      </button>
    </div>
  );
}

export default SaidaForm;