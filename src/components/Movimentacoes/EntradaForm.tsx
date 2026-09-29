import { useState, useEffect } from 'react';
import { criarEntrada, atualizarEntrada } from '../../services/entradaService';
import { listarContas } from '../../services/contaService';
import { listarCategoriasEntrada } from '../../services/categoriaEntradaService';
import type { Entrada } from '../../types/entrada';
import type { Conta } from '../../types/conta';
import type { CategoriaEntrada } from '../../types/categoria';
import type { StatusTransacao } from '../../types/enums';

interface EntradaFormProps {
  entradaEditando: Entrada | null;
  onSalvar: () => void;
  onFechar?: () => void;
}

const inputClass =
  'w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold';
const labelClass = 'text-xs text-ink/60 mb-1 block';

function EntradaForm({ entradaEditando, onSalvar, onFechar }: EntradaFormProps) {
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<StatusTransacao>('Confirmada');
  const [contaId, setContaId] = useState('');
  const [categoriaEntradaId, setCategoriaEntradaId] = useState('');

  const [contas, setContas] = useState<Conta[]>([]);
  const [categorias, setCategorias] = useState<CategoriaEntrada[]>([]);

  useEffect(() => {
    listarContas().then(setContas);
  }, []);

  useEffect(() => {
    listarCategoriasEntrada().then(setCategorias);
  }, []);

  useEffect(() => {
    if (entradaEditando) {
      setData(entradaEditando.data.split('T')[0]);
      setValor(String(entradaEditando.valor));
      setDescricao(entradaEditando.descricao);
      setStatus(entradaEditando.status);
      setContaId(entradaEditando.contaId);
      setCategoriaEntradaId(entradaEditando.categoriaEntradaId);
    } else {
      setData('');
      setValor('');
      setDescricao('');
      setContaId('');
      setCategoriaEntradaId('');
    }
  }, [entradaEditando]);

  async function handleSubmit() {
    try {
      const request = { data, valor: Number(valor), descricao, status, contaId, categoriaEntradaId };

      if (entradaEditando) {
        await atualizarEntrada(entradaEditando.id, request);
      } else {
        await criarEntrada(request);
      }

      setData('');
      setValor('');
      setDescricao('');
      setContaId('');
      setCategoriaEntradaId('');
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
          placeholder="Ex: Salário, freelance..."
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
          <select value={categoriaEntradaId} onChange={(e) => setCategoriaEntradaId(e.target.value)} className={inputClass}>
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
                ? 'bg-income/10 border-income text-income font-medium'
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
        className="w-full bg-income text-white text-sm font-medium py-2.5 rounded-lg hover:bg-income/90 transition-colors mt-2"
      >
        {entradaEditando ? 'Salvar edição' : 'Adicionar entrada'}
      </button>
    </div>
  );
}

export default EntradaForm;