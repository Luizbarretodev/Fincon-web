import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SeletorMesProps {
  mes: Date;
  onMudar: (novoMes: Date) => void;
}

function SeletorMes({ mes, onMudar }: SeletorMesProps) {
  const label = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(mes);
  const labelCapitalizado = label.charAt(0).toUpperCase() + label.slice(1);

  function irParaMesAnterior() {
    onMudar(new Date(mes.getFullYear(), mes.getMonth() - 1, 1));
  }

  function irParaProximoMes() {
    onMudar(new Date(mes.getFullYear(), mes.getMonth() + 1, 1));
  }

  return (
    <div className="flex items-center gap-3 bg-white border border-border rounded-lg px-3 py-2">
      <button onClick={irParaMesAnterior} className="text-ink/50 hover:text-ink transition-colors">
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm font-medium text-ink w-32 text-center">{labelCapitalizado}</span>
      <button onClick={irParaProximoMes} className="text-ink/50 hover:text-ink transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default SeletorMes;