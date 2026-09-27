import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginRoute from './components/LoginRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage.tsx';
import DashboardPage from './pages/DashboardPage';
import ContasPage from './pages/ContasPage';
import EntradasPage from './pages/EntradasPage';
import SaidasPage from './pages/SaidasPage';
import RecorrenciasPage from './pages/RecorrenciasPage';
import CategoriasPage from './pages/CategoriasPage';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registrar" element={<RegisterPage />} />

      <Route element={<LoginRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/contas" element={<ContasPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/entradas" element={<EntradasPage />} />
          <Route path="/saidas" element={<SaidasPage />} />
          <Route path="/recorrencias" element={<RecorrenciasPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;