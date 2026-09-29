import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { listarContas } from '../services/contaService';
import { listarCategoriasEntrada } from '../services/categoriaEntradaService';
import { listarCategoriasSaida } from '../services/categoriaSaidaService';
import { listarEntradas } from '../services/entradaService';
import { listarSaidas } from '../services/saidaService';
import { obterNomeUsuario } from '../services/authService';
import { agruparPorCategoria } from '../utils/group';
import { formatarMoeda } from '../utils/formatters';
import StatCard from '../components/StatCard';
import ResumoPorCategoria from '../components/ResumoPorCategoria';
import type { Conta } from '../types/conta';
import type { CategoriaEntrada, CategoriaSaida } from '../types/categoria';
import type { Entrada } from '../types/entrada';
import type { Saida } from '../types/saida';
import SeletorMes from '../components/SeletorMes';
import { filtrarPorMes } from '../utils/data';
import Modal from '../components/Modal';
import EntradaForm from '../components/Movimentacoes/EntradaForm';
import SaidaForm from '../components/Movimentacoes/SaidaForm';
import { Plus } from 'lucide-react';

function saudacao(): string {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

const coresConta = ['bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];

function DashboardPage() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [categoriasEntrada, setCategoriasEntrada] = useState<CategoriaEntrada[]>([]);
  const [categoriasSaida, setCategoriasSaida] = useState<CategoriaSaida[]>([]);
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [saidas, setSaidas] = useState<Saida[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mesSelecionado, setMesSelecionado] = useState(new Date());
  const [modalAberto, setModalAberto] = useState<'entrada' | 'saida' | null>(null);

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    try {
      const [c, ce, cs, e, s] = await Promise.all([
        listarContas(),
        listarCategoriasEntrada(),
        listarCategoriasSaida(),
        listarEntradas(),
        listarSaidas(),
      ]);
      setContas(c);
      setCategoriasEntrada(ce);
      setCategoriasSaida(cs);
      setEntradas(e);
      setSaidas(s);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return <p className="text-ink/60">Carregando...</p>;
  }

  const totalReceitas = entradas.reduce((soma, e) => soma + e.valor, 0);
  const totalDespesas = saidas.reduce((soma, s) => soma + s.valor, 0);
  const saldo = totalReceitas - totalDespesas;
  const entradasDoMes = filtrarPorMes(entradas, mesSelecionado);
  const saidasDoMes = filtrarPorMes(saidas, mesSelecionado);

  const totalReceitasMes = entradasDoMes.reduce((soma, e) => soma + e.valor, 0);
  const totalDespesasMes = saidasDoMes.reduce((soma, s) => soma + s.valor, 0);
  const saldoMensal = totalReceitasMes - totalDespesasMes;

  const nomesEntradaPorId = Object.fromEntries(categoriasEntrada.map((c) => [c.id, c.nome]));
  const nomesSaidaPorId = Object.fromEntries(categoriasSaida.map((c) => [c.id, c.nome]));

  const entradasPorCategoria = agruparPorCategoria(
    entradasDoMes.map((e) => ({ categoriaId: e.categoriaEntradaId, valor: e.valor })),
    nomesEntradaPorId
  );

  const saidasPorCategoria = agruparPorCategoria(
    saidasDoMes.map((s) => ({ categoriaId: s.categoriaSaidaId, valor: s.valor })),
    nomesSaidaPorId
  );

  const contasComSaldo = contas.map((conta) => {
    const totalEntradas = entradas.filter((e) => e.contaId === conta.id).reduce((s, e) => s + e.valor, 0);
    const totalSaidas = saidas.filter((s) => s.contaId === conta.id).reduce((s, sa) => s + sa.valor, 0);
    return { ...conta, saldo: totalEntradas - totalSaidas };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink">
            {saudacao()}, {obterNomeUsuario() ?? 'usuário'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setModalAberto('entrada')}
              className="flex items-center gap-2 bg-income/10 text-income text-sm font-medium px-4 py-2 rounded-lg hover:bg-income/20 transition-colors"
            >
              <Plus size={16} /> Entrada
            </button>
            <button
              onClick={() => setModalAberto('saida')}
              className="flex items-center gap-2 bg-expense/10 text-expense text-sm font-medium px-4 py-2 rounded-lg hover:bg-expense/20 transition-colors"
            >
              <Plus size={16} /> Saída
            </button>
          </div>
          <SeletorMes mes={mesSelecionado} onMudar={setMesSelecionado} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Saldo atual" valor={formatarMoeda(saldo)} icone={Wallet} destaque />
        <StatCard label="Receitas do mês" valor={formatarMoeda(totalReceitasMes)} icone={TrendingUp} corIcone="bg-income/10 text-income" />
        <StatCard label="Despesas do mês" valor={formatarMoeda(totalDespesasMes)} icone={TrendingDown} corIcone="bg-expense/10 text-expense" />
        <StatCard label="Saldo mensal" valor={formatarMoeda(saldoMensal)} icone={Scale} corIcone="bg-gold/10 text-gold" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <ResumoPorCategoria titulo="Entradas por categoria" itens={entradasPorCategoria} cor="income" />
          <ResumoPorCategoria titulo="Saídas por categoria" itens={saidasPorCategoria} cor="expense" />
        </div>

        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-display font-medium text-ink mb-3">Minhas contas</h3>
          <div>
            {contasComSaldo.map((conta, index) => (
              <div key={conta.id} className="flex items-center gap-3 py-2">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-medium ${coresConta[index % coresConta.length]}`}>
                  {conta.nome.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-ink">{conta.nome}</p>
                  <p className="text-xs text-ink/50">Saldo disponível</p>
                </div>
                <span className={`text-sm font-medium ${conta.saldo >= 0 ? 'text-income' : 'text-expense'}`}>
                  {formatarMoeda(conta.saldo)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal titulo="Nova Entrada" aberto={modalAberto === 'entrada'} onFechar={() => setModalAberto(null)}>
        <EntradaForm entradaEditando={null} onSalvar={carregarTudo} onFechar={() => setModalAberto(null)} />
      </Modal>

      <Modal titulo="Nova Saída" aberto={modalAberto === 'saida'} onFechar={() => setModalAberto(null)}>
        <SaidaForm saidaEditando={null} onSalvar={carregarTudo} onFechar={() => setModalAberto(null)} />
      </Modal>
    </div>
  );
}

export default DashboardPage;