import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrar } from '../services/authService';
import AuthTabs from '../components/AuthTabs';
import { senhaValida } from '../utils/validarSenha';

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {
  if (!senhaValida(senha)) {
    setErro('A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.');
    return;
  }

  try {
    await registrar({ nome, email, senha });
    navigate('/login');
  } catch {
    setErro('Erro ao registrar. Tente outro email.');
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
          <AuthTabs ativo="registrar" />

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold mb-3"
          />
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
            Criar conta
          </button>

          {erro && <p className="text-expense text-sm text-center mt-3">{erro}</p>}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;