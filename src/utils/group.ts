export function agruparPorCategoria(
  itens: { categoriaId: string; valor: number }[],
  nomesPorId: Record<string, string>
) {
  const totais: Record<string, number> = {};

  for (const item of itens) {
    const nome = nomesPorId[item.categoriaId] ?? 'Sem categoria';
    totais[nome] = (totais[nome] ?? 0) + item.valor;
  }

  return Object.entries(totais)
    .map(([nome, total]) => ({ nome, total }))
    .sort((a, b) => b.total - a.total);
}