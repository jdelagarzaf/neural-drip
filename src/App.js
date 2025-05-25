import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Data from './pages/Data';
import TiendasMap from './pages/TiendasMap';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
        <Navbar />
        <div className="flex bg-zinc-800 h-full">
          <Sidebar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/data" element={<Data />} />
          <Route path="/tiendasMap" element={<TiendasMap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
