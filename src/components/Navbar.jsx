import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div>
        <nav>
            <Link to="/">Home</Link> | <Link to="/map">Map</Link> | <Link to="/data">Data</Link> | <Link to="/tiendasMap">Tiendas Map</Link>
        </nav>
    </div>
  );
}
