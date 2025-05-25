import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import NotFound from './pages/NotFound';
import Mapa from './pages/Tiendas/Index';
import Location from './pages/Location/Index';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/location" element={<Location />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
