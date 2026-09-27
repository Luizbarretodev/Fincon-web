import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Categoria {
  id: string;
  nome: string;
}

interface PainelCategoriaProps {
  titulo: string;
  subtitulo: string;
  rotulo: string;
  itens: Categoria[];
  cor: 'income' | 'expense';
  onCriar: (nome: string) => Promise<void>;
  onAtualizar: (id: string, nome: string) => Promise<void>;
  onExcluir: (id: string) => Promise<void>;
}

function PainelCategoria({ titulo, subtitulo, rotulo, itens, cor, onCriar, onAtualizar, onExcluir }: PainelCategoriaProps) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nome, setNome] = useState('');
  const [editando, setEditando] = useState<Categoria | null>(null);

  useEffect(() => {
    setNome(editando ? editando.nome : '');
  }, [editando]);

  async function handleSubmit() {
    if (editando) {
      await onAtualizar(editando.id, nome);
    } else {
      await onCriar(nome);
    }
    setNome('');
    setEditando(null);
    setMostrarForm(false);
  }

  function iniciarEdicao(categoria: Categoria) {
    setEditando(categoria);
    setMostrarForm(true);
  }

  const corBadge = cor === 'income' ? 'bg-income/10 text-income' : 'bg-expense/10 text-expense';
  const corIcone = cor === 'income' ? 'bg-income/10 text-income' : 'bg-expense/10 text-expense';

  return (
    <div className="bg-white rounded-xl border border-border">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${corIcone}`}>
            <Plus size={16} />
          </div>
          <div>
            <p className="font-display font-medium text-ink">{titulo}</p>
            <p className="text-xs text-ink/50">{subtitulo}</p>
          </div>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/50 hover:bg-paper hover:text-ink transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {mostrarForm && (
        <div className="flex gap-2 px-5 py-3 border-b border-border bg-paper/50">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da categoria"
            className="flex-1 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          />
          <button onClick={handleSubmit} className="bg-ink text-white text-sm px-3 py-1.5 rounded-lg hover:bg-ink/90 transition-colors">
            Salvar
          </button>
          <button
            onClick={() => { setMostrarForm(false); setEditando(null); }}
            className="text-ink/50 text-sm px-3 py-1.5 hover:text-ink transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="p-2">
        {itens.length === 0 && (
          <p className="text-sm text-ink/40 text-center py-6">Nenhuma categoria ainda.</p>
        )}
        {itens.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-paper transition-colors">
            <span className="text-sm text-ink">{item.nome}</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${corBadge}`}>{rotulo}</span>
              <button onClick={() => iniciarEdicao(item)} className="text-ink/40 hover:text-ink transition-colors">
                <Pencil size={14} />
              </button>
              <button onClick={() => onExcluir(item.id)} className="text-ink/40 hover:text-expense transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PainelCategoria;