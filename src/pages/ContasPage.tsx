import { useState, useEffect } from 'react';
import { Wallet, Pencil, Trash2, Plus } from 'lucide-react';
import { listarContas, criarConta, atualizarConta, excluirConta } from '../services/contaService';
import type { Conta } from '../types/conta';

const coresConta = ['bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];

function ContasPage() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [nome, setNome] = useState('');
  const [contaEditando, setContaEditando] = useState<Conta | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    carregarContas();
  }, []);

  useEffect(() => {
    setNome(contaEditando ? contaEditando.nome : '');
  }, [contaEditando]);

  async function carregarContas() {
    const dados = await listarContas();
    setContas(dados);
  }

  async function handleSubmit() {
    try {
      if (contaEditando) {
        await atualizarConta(contaEditando.id, { nome });
      } else {
        await criarConta({ nome });
      }
      setNome('');
      setContaEditando(null);
      setMostrarForm(false);
      carregarContas();
    } catch (erro) {
      console.error(erro);
    }
  }

  async function handleExcluir(id: string) {
    try {
      await excluirConta(id);
      carregarContas();
    } catch (erro) {
      console.error(erro);
    }
  }

  function iniciarEdicao(conta: Conta) {
    setContaEditando(conta);
    setMostrarForm(true);
  }

  function cancelar() {
    setContaEditando(null);
    setMostrarForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink">Minhas contas</h1>
          <p className="text-ink/60 text-sm mt-1">Acompanhe onde seu dinheiro está.</p>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="flex items-center gap-2 bg-ink text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors"
        >
          <Plus size={16} />
          Nova conta
        </button>
      </div>

      {mostrarForm && (
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-display font-medium text-ink mb-3">
            {contaEditando ? 'Editar conta' : 'Nova conta'}
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome da conta"
              className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
            />
            <button
              onClick={handleSubmit}
              className="bg-ink text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors"
            >
              Salvar
            </button>
            <button
              onClick={cancelar}
              className="text-ink/60 text-sm px-4 py-2 rounded-lg hover:bg-paper transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {contas.map((conta, index) => (
          <div key={conta.id} className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-medium ${coresConta[index % coresConta.length]}`}>
                {conta.nome.charAt(0).toUpperCase()}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => iniciarEdicao(conta)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/50 hover:bg-paper hover:text-ink transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleExcluir(conta.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-expense/60 hover:bg-expense/10 hover:text-expense transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="font-medium text-ink">{conta.nome}</p>
          </div>
        ))}

        {contas.length === 0 && (
          <div className="col-span-3 bg-white rounded-xl border border-border border-dashed p-10 text-center">
            <Wallet className="mx-auto text-ink/30 mb-2" size={28} />
            <p className="text-ink/50 text-sm">Nenhuma conta cadastrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContasPage;