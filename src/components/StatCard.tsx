import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  valor: string;
  icone: LucideIcon;
  destaque?: boolean;
  corIcone?: string;
}

function StatCard({ label, valor, icone: Icone, destaque = false, corIcone = 'bg-ink/5 text-ink' }: StatCardProps) {
  return (
    <div
      className={`rounded-xl p-5 border ${
        destaque ? 'bg-ink text-white border-ink' : 'bg-white border-border'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`text-sm ${destaque ? 'text-white/70' : 'text-ink/60'}`}>{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${destaque ? 'bg-white/10 text-gold' : corIcone}`}>
          <Icone size={16} />
        </div>
      </div>
      <p className={`font-display font-semibold text-2xl ${destaque ? 'text-white' : 'text-ink'}`}>{valor}</p>
    </div>
  );
}

export default StatCard;