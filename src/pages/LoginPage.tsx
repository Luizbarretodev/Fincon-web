import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, salvarToken } from '../services/authService';
import AuthTabs from '../components/AuthTabs';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const resposta = await login({ email, senha });
      salvarToken(resposta.token);
      navigate('/');
    } catch {
      setErro('Email ou senha inválidos');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display font-semibold text-3xl text-ink">Fincon</h1>
          <p className="text-ink/60 text-sm mt-1">Controle financeiro pessoal, simples e centralizado.</p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <AuthTabs ativo="login" />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold mb-3"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold mb-4"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-ink text-white rounded-lg py-2.5 text-sm font-medium hover:bg-ink/90 transition-colors"
          >
            Entrar
          </button>

          {erro && <p className="text-expense text-sm text-center mt-3">{erro}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;