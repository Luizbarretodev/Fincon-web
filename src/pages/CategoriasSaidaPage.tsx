import { useState, useEffect } from 'react';
import { listarCategoriasSaida } from '../services/categoriaSaidaService';
import type { CategoriaSaida } from '../types/categoria';
import CategoriaSaidaForm from '../components/CategoriaSaidaForm';
import CategoriaSaidaList from '../components/CategoriaSaidaList';

function CategoriasSaidaPage() {
    const [categoriasSaida, setCategoriasSaida] = useState<CategoriaSaida[]>([]);

    useEffect(() => {
        carregarCategoriasSaida();
    }, []);

    async function carregarCategoriasSaida() {
        try {
            const dados = await listarCategoriasSaida();
            setCategoriasSaida(dados);
        } catch (erro) {
            console.error(erro);
        }
    }

    return (
        <div>
            <h2>Categorias de saida cadastradas</h2>
            <CategoriaSaidaForm onCategoriaSaidaCriada={carregarCategoriasSaida} />
            <CategoriaSaidaList categoriasSaida={categoriasSaida} />
        </div>
    );
}

export default CategoriasSaidaPage;