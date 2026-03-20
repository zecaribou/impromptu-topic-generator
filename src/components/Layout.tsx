import { NavLink, Outlet } from 'react-router-dom';
import { Mic2, Calendar, BarChart2 } from 'lucide-react';

export function Layout() {
  return (
    <div className="flex-col w-full min-h-screen">
      <header className="top-nav">
        <NavLink to="/" className="brand-logo">SpeechLab</NavLink>
        <nav className="nav-links">
          <NavLink to="/impromptu" className={({ isActive }) => `nav-link flex items-center gap-1.5 ${isActive ? 'active' : ''}`}>
            <Mic2 size={16} /> <span className="hide-mobile">Impromptu</span>
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => `nav-link flex items-center gap-1.5 ${isActive ? 'active' : ''}`}>
            <Calendar size={16} /> <span className="hide-mobile">Calendar</span>
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => `nav-link flex items-center gap-1.5 ${isActive ? 'active' : ''}`}>
            <BarChart2 size={16} /> <span className="hide-mobile">Insights</span>
          </NavLink>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
