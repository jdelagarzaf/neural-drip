import useDimTienda from '../hooks/useDimTienda';

export default function Data() {
  const { data, loading } = useDimTienda();

  if (loading) return <p>Loading tiendas...</p>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <h2>Tiendas</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Tienda ID</th>
            <th>Plaza</th>
            <th>Nivel Socioeconómico</th>
            <th>Entorno</th>
            <th>Área (m²)</th>
            <th>Refrigeradores</th>
            <th>Estacionamiento</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Segmento</th>
            <th>Ubicación</th>
            <th>Dataset</th>
          </tr>
        </thead>
        <tbody>
          {data.map(tienda => (
            <tr key={tienda.tienda_id}>
              <td>{tienda.tienda_id}</td>
              <td>{tienda.plaza_cve}</td>
              <td>{tienda.nivelsocioeconomico_des}</td>
              <td>{tienda.entorno_des}</td>
              <td>{tienda.mts2ventas_num}</td>
              <td>{tienda.puertasrefrig_num}</td>
              <td>{tienda.cajonesestacionamiento_num}</td>
              <td>{tienda.latitud_num}</td>
              <td>{tienda.longitud_num}</td>
              <td>{tienda.segmento_maestro_desc}</td>
              <td>{tienda.lid_ubicacion_tienda}</td>
              <td>{tienda.dataset}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
