import { Link } from 'react-router-dom';
import LogoOxxo from '../assets/logo_oxxo.png';

export default function Navbar() {
  return (
    <div className="bg-zinc-900 text-gray-100 flex">
      <div>
        <img src={LogoOxxo} alt="Logo OXXO" className="h-15 m-4" />
      </div>
      <div className="flex items-center">
        <Link to="/" className="text-white hover:text-gray-300 m-4 align-center">
          Inicio
        </Link>
        <Link to="/map" className="text-white hover:text-gray-300 m-4">
          Mapa
        </Link>
        <Link to="/data" className="text-white hover:text-gray-300 m-4">
          Datos
        </Link>
        <Link to="/tiendasMap" className="text-white hover:text-gray-300 m-4">
          Tiendas
        </Link>
      </div>
    </div>
  );
}
