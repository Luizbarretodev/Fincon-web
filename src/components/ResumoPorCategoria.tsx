interface ResumoPorCategoriaProps {
  titulo: string;
  itens: { nome: string; total: number }[];
  cor: 'income' | 'expense';
}

function ResumoPorCategoria({ titulo, itens, cor }: ResumoPorCategoriaProps) {
  const maiorTotal = Math.max(...itens.map((i) => i.total), 1);
  const corBarra = cor === 'income' ? 'bg-income' : 'bg-expense';
  const corTexto = cor === 'income' ? 'text-income' : 'text-expense';

  return (
    <div className="bg-white rounded-lg border border-border p-5">
      <h3 className="font-display font-medium text-ink mb-4">{titulo}</h3>

      {itens.length === 0 ? (
        <p className="text-sm text-ink/50">Nenhum lançamento ainda.</p>
      ) : (
        <div className="space-y-3">
          {itens.map((item) => (
            <div key={item.nome}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-ink/80">{item.nome}</span>
                <span className={`font-medium ${corTexto}`}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total)}
                </span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full ${corBarra} rounded-full`}
                  style={{ width: `${(item.total / maiorTotal) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumoPorCategoria;