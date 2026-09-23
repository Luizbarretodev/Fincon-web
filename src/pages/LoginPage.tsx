import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, salvarToken } from '../services/authService';

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
    } catch (err) {
      setErro('Email ou senha inválidos');
    }
  }

  return (
    <div>
      <h1>Fincon — Login</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button onClick={handleSubmit}>Entrar</button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}

export default LoginPage;