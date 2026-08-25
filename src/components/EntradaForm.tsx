import { useState, useEffect } from 'react';
import { criarEntrada, atualizarEntrada } from '../services/entradaService';
import { listarContas } from '../services/contaService';
import { listarCategoriasEntrada } from '../services/categoriaEntradaService';
import type { Entrada } from '../types/entrada';
import type { Conta } from '../types/conta';
import type { CategoriaEntrada } from '../types/categoria';
import type { StatusTransacao } from '../types/enums';

interface EntradaFormProps {
  entradaEditando: Entrada | null;
  onSalvar: () => void;
}

function EntradaForm({ entradaEditando, onSalvar }: EntradaFormProps) {
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<StatusTransacao>('Confirmada');
  const [contaId, setContaId] = useState('');
  const [categoriaEntradaId, setCategoriaEntradaId] = useState('');

  const [contas, setContas] = useState<Conta[]>([]);
  const [categorias, setCategorias] = useState<CategoriaEntrada[]>([]);

  useEffect(() => {
    carregarContas();
  }, []);

  useEffect(() => {
    carregarCategorias();
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

  async function carregarContas() {
    const dados = await listarContas();
    setContas(dados);
  }

  async function carregarCategorias() {
    const dados = await listarCategoriasEntrada();
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
        categoriaEntradaId,
      };

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

      <select value={categoriaEntradaId} onChange={(e) => setCategoriaEntradaId(e.target.value)}>
        <option value="">Selecione uma categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
        ))}
      </select>

      <button onClick={handleSubmit}>{entradaEditando ? 'Salvar Edição' : 'Criar Entrada'}</button>
    </div>
  );
}

export default EntradaForm;