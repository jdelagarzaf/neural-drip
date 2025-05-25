import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Mapa from './pages/Tiendas/Index';
import Location from './pages/Location/Index';
import Ventas from './pages/Ventas/Index';
import Exploracion from './pages/Exploracion/Index';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/location" element={<Location />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/exploracion" element={<Exploracion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
