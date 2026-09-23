import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrar } from '../services/authService';

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      await registrar({ nome, email, senha });
      navigate('/login');
    } catch (err) {
      setErro('Erro ao registrar. Tente outro email.');
    }
  }

  return (
    <div>
      <h1>Fincon — Criar Conta</h1>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button onClick={handleSubmit}>Criar Conta</button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}

export default RegisterPage;