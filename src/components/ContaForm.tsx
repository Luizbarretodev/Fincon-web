import { useState } from "react";
import { criarConta } from "../services/contaService";

interface ContaFormProps {
    onContaCriada: () => void;
}

function ContaForm({ onContaCriada }: ContaFormProps) {
    const [nome, setNome] = useState('');

    async function handleSubmit() {
        try {
            await criarConta({ nome });
            setNome('');
            onContaCriada();
        } catch (erro) {
            console.error(erro);
        }
    }

    return (
    <div>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da conta"
      />
      <button onClick={handleSubmit}>Criar Conta</button>
    </div>
  );
}

export default ContaForm;