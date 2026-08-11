const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatarMoeda(valor: number): string {
  return formatadorMoeda.format(valor);
}

const formatadorData = new Intl.DateTimeFormat('pt-BR');

export function formatarData(data: string): string {
  return formatadorData.format(new Date(data));
}