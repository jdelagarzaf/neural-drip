// Puedes llamarlo MapComponent.jsx
import React, { useRef, useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyDiD4G4Vu5zTV7iN6bjRLH9jBvgEhH4238";

function loadScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      // Ya está cargado
      if (window.google && window.google.maps) {
        resolve();
      } else {
        // Espera a que esté disponible
        const interval = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      }
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

export default function MapComponent() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lat, setLat] = useState(25.65183591284399);
  const [lng, setLng] = useState(-100.28939102466093);

  useEffect(() => {
    const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    loadScript(src).then(() => {
      if (!window.google || !window.google.maps) return;
      const initialPosition = { lat: 25.65183591284399, lng: -100.28939102466093 };
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: initialPosition,
      });
      setMap(mapInstance);
      
      // Marcador inicial
      // const marker = new window.google.maps.Marker({
      //   position: initialPosition,
      //   map: mapInstance,
      // });
      // setMarkers([marker]);
    });
  }, []);

  const updateMap = () => {
    const newLat = parseFloat(lat);
    const newLng = parseFloat(lng);
    if (!isNaN(newLat) && !isNaN(newLng) && map) {
      const newPosition = { lat: newLat, lng: newLng };
      map.setCenter(newPosition);
      const marker = new window.google.maps.Marker({
        position: newPosition,
        map: map,
      });
      setMarkers((prev) => [...prev, marker]);
    } else {
      alert("Por favor ingresa coordenadas válidas.");
    }
  };

  const clearMap = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  return (
    <div>
      <h1>Mapa</h1>
      <div className="controls" style={{ marginBottom: 10 }}>
        <label>
          Latitud:{" "}
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        <label>
          Longitud:{" "}
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </label>
        <button onClick={updateMap}>Mostrar ubicación</button>
        <button onClick={clearMap}>Limpiar mapa</button>
      </div>
      <div
        id="map"
        ref={mapRef}
        style={{ height: "500px", width: "100%" }}
      ></div>
    </div>
  );
}