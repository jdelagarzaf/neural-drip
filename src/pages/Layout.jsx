import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Home from './Home';
import Map from './Map';
import Data from './Data';
import TiendasMap from './TiendasMap';
import NotFound from './NotFound';

export default function Layout() {
  const [filters, setFilters] = useState({
    plaza: '',
    nivel: '',
    entorno: '',
    segmento: '',
    ubicacion: '',
  });

  return (
    <div className="flex bg-zinc-800 h-full">
      <Sidebar filters={filters} setFilters={setFilters} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/data" element={<Data />} />
            <Route path="/tiendasMap" element={<TiendasMap filters={filters}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
  );
}
