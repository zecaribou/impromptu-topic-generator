import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import ImpromptuPage from './pages/ImpromptuPage';
import CalendarPage from './pages/CalendarPage';
import InsightsPage from './pages/InsightsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/impromptu" element={<ImpromptuPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
