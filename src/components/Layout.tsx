import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ width: '200px', padding: '16px' }}>
        <h2>Fincon</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/contas">Contas</Link></li>
          <li><Link to="/categorias-entrada">Categorias de Entrada</Link></li>
          <li><Link to="/categorias-saida">Categorias de Saída</Link></li>
          <li><Link to="/entradas">Entradas</Link></li>
          <li><Link to="/saidas">Saídas</Link></li>
          <li><Link to="/recorrencias">Recorrências</Link></li>
        </ul>
      </nav>

      <main style={{ flex: 1, padding: '16px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;