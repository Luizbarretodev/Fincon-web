import { Link } from 'react-router-dom';

interface AuthTabsProps {
  ativo: 'login' | 'registrar';
}

function AuthTabs({ ativo }: AuthTabsProps) {
  return (
    <div className="flex bg-paper rounded-full p-1 mb-6">
      <Link
        to="/login"
        className={`flex-1 text-center text-sm py-2 rounded-full transition-colors ${
          ativo === 'login' ? 'bg-ink text-white font-medium' : 'text-ink/60 hover:text-ink'
        }`}
      >
        Entrar
      </Link>
      <Link
        to="/registrar"
        className={`flex-1 text-center text-sm py-2 rounded-full transition-colors ${
          ativo === 'registrar' ? 'bg-ink text-white font-medium' : 'text-ink/60 hover:text-ink'
        }`}
      >
        Criar conta
      </Link>
    </div>
  );
}

export default AuthTabs;