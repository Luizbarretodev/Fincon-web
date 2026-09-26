import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Tag,
  Repeat,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { removerToken, obterNomeUsuario } from '../services/authService';

const menuLinks = [
  { to: '/', label: 'Dashboard', icone: LayoutDashboard },
  { to: '/contas', label: 'Contas', icone: Wallet },
  { to: '/entradas', label: 'Entradas', icone: ArrowDownCircle },
  { to: '/saidas', label: 'Saídas', icone: ArrowUpCircle },
  { to: '/categorias-entrada', label: 'Cat. Entrada', icone: Tag },
  { to: '/categorias-saida', label: 'Cat. Saída', icone: Tag },
  { to: '/recorrencias', label: 'Recorrências', icone: Repeat },
];

function Layout() {
  const [recolhida, setRecolhida] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    removerToken();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex bg-paper">
      <aside
        className={`bg-ink text-white flex flex-col shrink-0 transition-all duration-200 ${
          recolhida ? 'w-16' : 'w-60'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          {!recolhida && <span className="font-display font-semibold text-lg">Fincon</span>}
          <button
            onClick={() => setRecolhida(!recolhida)}
            className="text-white/60 hover:text-white transition-colors"
          >
            {recolhida ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {!recolhida && (
          <p className="px-4 text-[11px] tracking-wide text-white/40 mb-2">Menu</p>
        )}

        <nav className="flex-1 px-3 space-y-1">
          {menuLinks.map((link) => {
            const ativo = location.pathname === link.to;
            const Icone = link.icone;
            return (
              <Link
                key={link.to}
                to={link.to}
                title={recolhida ? link.label : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  ativo
                    ? 'bg-white/10 text-gold font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icone size={18} className="shrink-0" />
                {!recolhida && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {!recolhida && (
          <p className="px-4 text-[11px] tracking-wide text-white/40 mt-4 mb-2">Geral</p>
        )}

        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            title={recolhida ? 'Sair' : undefined}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} className="shrink-0" />
            {!recolhida && <span>Sair</span>}
          </button>
        </div>

        {!recolhida && (
          <div className="px-4 py-3 border-t border-white/10">
            <p className="text-xs text-white/50 truncate">{obterNomeUsuario()}</p>
          </div>
        )}
      </aside>

      <main className="flex-1 px-8 py-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;