import { useCallback, useState, useRef } from 'react';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import useDimTienda from '../../hooks/useDimTienda';
import OxxoStore from '../../assets/oxxo_store.svg';

export default function Mapa({ customLocation, setCustomLocation }) {
  const { data: tiendas, loading } = useDimTienda();
  const [selectedTienda, setSelectedTienda] = useState(null);
  const mapRef = useRef(null);

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const handleMapClick = useCallback((event) => {
    const { lng, lat } = event.lngLat;
    setCustomLocation(prev => ({ ...prev, longitude: lng, latitude: lat }));
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: 15,
      speed: 1.2
    });

  }, [setCustomLocation]);

  if (loading) return <p>Loading map...</p>;

  return (
    <Map ref={mapRef}
      initialViewState={{
        longitude: -100.30,
        latitude: 25.64,
        zoom: 13,
        pitch: 60, // Tilt the map
        bearing: 0
      }}
      style={{ width: '100%', height: '600px' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={mapboxToken}
      onClick={handleMapClick}
      onLoad={(event) => {
        const map = event.target;

        map.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.9,
          },
        });
      }}
    >
      {tiendas.map((tienda) => (
          <Marker
            key={tienda.tienda_id}
            longitude={parseFloat(tienda.longitud_num)}
            latitude={parseFloat(tienda.latitud_num)}
            onClick={() => setSelectedTienda(tienda)}
          >
            <div style={{ cursor: 'pointer' }}>
              <img
                src={OxxoStore}
                alt="OXXO Store"
                style={{ width: '30px', height: '30px' }}
              />
            </div>
          </Marker>
        ))}

      {selectedTienda && (
        <Popup
          longitude={parseFloat(selectedTienda.longitud_num)}
          latitude={parseFloat(selectedTienda.latitud_num)}
          onClose={() => setSelectedTienda(null)}
          closeOnClick={false}
        >
          <div>
            <strong> ID Tienda: {selectedTienda.tienda_id}</strong><br />
            Plaza: {selectedTienda.plaza_cve}<br />
            Nivel Socioeconómico: {selectedTienda.nivelsocioeconomico_des}<br />
            Entorno: {selectedTienda.entorno_des}<br />
            Segmento: {selectedTienda.segmento_maestro_desc}<br />
            Área: {selectedTienda.mts2ventas_num} m² <br />
            Refrigeradores: {selectedTienda.puertasrefrig_num}<br />
            Estacionamiento: {selectedTienda.cajonesestacionamiento_num}<br />
            Ubicacion Tienda: {selectedTienda.lid_ubicacion_tienda}<br />
            Dataset: {selectedTienda.dataset}<br />
            <a href={`https://www.google.com/maps/search/?api=1&query=${selectedTienda.latitud_num},${selectedTienda.longitud_num}`} target="_blank" rel="noopener noreferrer">
              Ver en Google Maps
            </a>
          </div>
        </Popup>
      )}

      {customLocation.latitude && customLocation.longitude && (
        <>
          <Marker
            longitude={customLocation.longitude}
            latitude={customLocation.latitude}
            anchor="bottom"
          >
            <div className="text-red-600 text-2xl">📍</div>
          </Marker>

          <Source
            id="circle"
            type="geojson"
            data={{
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [customLocation.longitude, customLocation.latitude],
                  },
                },
              ],
            }}
          >
            <Layer
              id="circle-fill"
              type="circle"
              paint={{
                "circle-radius": {
                  stops: [
                    [0, 0],
                    [20, customLocation.radius / 0.075], // Adjusted for meters at zoom ~14-16
                  ],
                  base: 2,
                },
                "circle-color": "#ff0000",
                "circle-opacity": 0.3,
              }}
            />
          </Source>
        </>
      )}
    </Map>
  );
}
