import { useState } from "react";
import { criarCategoriaEntrada } from "../services/categoriaEntradaService";

interface CategoriaEntradaFormProps {
    onCategoriaEntradaCriada: () => void;
}

function CategoriaEntradaForm({ onCategoriaEntradaCriada }: CategoriaEntradaFormProps) {
    const [nome, setNome] = useState('');

    async function handleSubmit() {
        try {
            await criarCategoriaEntrada({ nome });
            setNome('');
            onCategoriaEntradaCriada();
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

export default CategoriaEntradaForm;