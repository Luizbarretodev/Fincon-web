export function filtrarPorMes<T extends { data: string }>(itens: T[], mes: Date): T[] {
  return itens.filter((item) => {
    const data = new Date(item.data);
    return data.getMonth() === mes.getMonth() && data.getFullYear() === mes.getFullYear();
  });
}