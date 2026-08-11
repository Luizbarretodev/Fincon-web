import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ContasPage from './pages/ContasPage';
import CategoriasEntradaPage from './pages/CategoriasEntradaPage';
import CategoriasSaidaPage from './pages/CategoriasSaidaPage';
import EntradasPage from './pages/EntradasPage';
import SaidasPage from './pages/SaidasPage';
import RecorrenciasPage from './pages/RecorrenciasPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contas" element={<ContasPage />} />
        <Route path="/categorias-entrada" element={<CategoriasEntradaPage />} />
        <Route path="/categorias-saida" element={<CategoriasSaidaPage />} />
        <Route path="/entradas" element={<EntradasPage />} />
        <Route path="/saidas" element={<SaidasPage />} />
        <Route path="/recorrencias" element={<RecorrenciasPage />} />
      </Route>
    </Routes>
  );
}

export default App;