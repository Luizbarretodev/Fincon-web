import ContasPage from './pages/ContasPage';
import CategoriasEntradaPage from './pages/CategoriasEntradaPage';
import CategoriasSaidaPage from './pages/CategoriasSaidaPage';
import EntradaPage from './pages/EntradasPage';
import SaidaPage from './pages/SaidasPage';
// ...
<SaidaPage />
import './App.css';

function App() {
  return (
    <div>
      <h1>Fincon</h1>
      <ContasPage />
      <CategoriasEntradaPage />
      <CategoriasSaidaPage />
      <EntradaPage />
    </div>
  );
}

export default App;