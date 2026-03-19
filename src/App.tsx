import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar as CalendarIcon, BarChart2 } from 'lucide-react';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import InsightsPage from './pages/InsightsPage';

function App() {
  const location = useLocation();

  return (
    <>
      <main className="p-6 flex-1 flex flex-col" style={{ width: '100%' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </main>

      <nav className="bottom-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-item ${isActive || location.pathname === '/' ? 'active' : ''}`}
        >
          <Home />
          <span>Home</span>
        </NavLink>
        <NavLink 
          to="/calendar" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <CalendarIcon />
          <span>Calendar</span>
        </NavLink>
        <NavLink 
          to="/insights" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <BarChart2 />
          <span>Insights</span>
        </NavLink>
      </nav>
    </>
  );
}

export default App;
