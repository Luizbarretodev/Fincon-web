import { useState } from "react";
import { criarCategoriaSaida } from "../services/categoriaSaidaService.ts";

interface CategoriaSaidaFormProps {
    onCategoriaSaidaCriada: () => void;
}

function CategoriaSaidaForm({ onCategoriaSaidaCriada }: CategoriaSaidaFormProps) {
    const [nome, setNome] = useState('');

    async function handleSubmit() {
        try {
            await criarCategoriaSaida({ nome });
            setNome('');
            onCategoriaSaidaCriada();
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
        placeholder="Nome da categoria"
      />
      <button onClick={handleSubmit}>Criar Categoria</button>
    </div>
  );
}

export default CategoriaSaidaForm;