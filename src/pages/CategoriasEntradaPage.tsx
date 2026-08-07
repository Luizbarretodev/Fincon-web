import { useState, useEffect } from 'react';
import { listarCategoriasEntrada } from '../services/CategoriaEntradaService';
import type { CategoriaEntrada } from '../types/categoria';
import CategoriaEntradaForm from '../components/CategoriaEntradaForm';
import CategoriaEntradaList from '../components/CategoriaEntradaList';

function CategoriasEntradaPage() {
    const [categoriasEntrada, setCategoriasEntrada] = useState<CategoriaEntrada[]>([]);

    useEffect(() => {
        carregarCategoriasEntrada();
    }, []);

    async function carregarCategoriasEntrada() {
        try {
            const dados = await listarCategoriasEntrada();
            setCategoriasEntrada(dados);
        } catch (erro) {
            console.error(erro);
        }
    }

    return (
        <div>
            <h2>Categorias de entrada cadastradas</h2>
            <CategoriaEntradaForm onCategoriaEntradaCriada={carregarCategoriasEntrada} />
            <CategoriaEntradaList categoriasEntrada={categoriasEntrada} />
        </div>
    );
}

export default CategoriasEntradaPage;