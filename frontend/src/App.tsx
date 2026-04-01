import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<LandingPage section="features" />} />
      <Route path="/solutions" element={<LandingPage section="solutions" />} />
      <Route path="/docs" element={<LandingPage section="docs" />} />
      <Route path="/pricing" element={<LandingPage section="pricing" />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}


export default App;
