import { useState, useEffect } from 'react';
import { criarSaida, atualizarSaida } from '../services/saidaService';
import { listarContas } from '../services/contaService';
import { listarCategoriasSaida } from '../services/categoriaSaidaService';
import type { Saida } from '../types/saida';
import type { Conta } from '../types/conta';
import type { CategoriaSaida } from '../types/categoria';
import type { StatusTransacao } from '../types/enums';

interface SaidaFormProps {
  saidaEditando: Saida | null;
  onSalvar: () => void;
}

function SaidaForm({ saidaEditando, onSalvar }: SaidaFormProps) {
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<StatusTransacao>('Confirmada');
  const [contaId, setContaId] = useState('');
  const [categoriaSaidaId, setCategoriaSaidaId] = useState('');

  const [contas, setContas] = useState<Conta[]>([]);
  const [categorias, setCategorias] = useState<CategoriaSaida[]>([]);

  useEffect(() => {
    carregarContas();
  }, []);

  useEffect(() => {
    carregarCategorias();
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

  async function carregarContas() {
    const dados = await listarContas();
    setContas(dados);
  }

  async function carregarCategorias() {
    const dados = await listarCategoriasSaida();
    setCategorias(dados);
  }

  async function handleSubmit() {
    try {
      const request = {
        data,
        valor: Number(valor),
        descricao,
        status,
        contaId,
        categoriaSaidaId,
      };

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
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Valor" />
      <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />

      <select value={status} onChange={(e) => setStatus(e.target.value as StatusTransacao)}>
        <option value="Confirmada">Confirmada</option>
        <option value="Pendente">Pendente</option>
      </select>

      <select value={contaId} onChange={(e) => setContaId(e.target.value)}>
        <option value="">Selecione uma conta</option>
        {contas.map((conta) => (
          <option key={conta.id} value={conta.id}>{conta.nome}</option>
        ))}
      </select>

      <select value={categoriaSaidaId} onChange={(e) => setCategoriaSaidaId(e.target.value)}>
        <option value="">Selecione uma categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
        ))}
      </select>

      <button onClick={handleSubmit}>{saidaEditando ? 'Salvar Edição' : 'Criar Saída'}</button>
    </div>
  );
}

export default SaidaForm;