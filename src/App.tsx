import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import PracticePage from './pages/PracticePage';
import CalendarPage from './pages/CalendarPage';
import InsightsPage from './pages/InsightsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PracticePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
