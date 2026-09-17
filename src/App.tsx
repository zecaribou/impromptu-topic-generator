import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import PracticePage from './pages/PracticePage';
import EventsPage from './pages/EventsPage';
import InsightsPage from './pages/InsightsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PracticePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/calendar" element={<EventsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
