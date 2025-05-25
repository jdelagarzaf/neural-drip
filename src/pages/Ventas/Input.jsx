import { estimateFieldsFromNearby } from '../../services/geoEstimation';
import useDimTienda from '../../hooks/useDimTienda';
import { useState, useEffect } from 'react';
import useVentasPrediction from '../../hooks/useVentasPrediction';

export default function Input({ customLocation, setCustomLocation }) {
  const [guesses, setGuesses] = useState(null);
  const { data: tiendas } = useDimTienda();
  const { metaResult, loading: metaLoading, error: metaError, predictMeta } = useVentasPrediction();
  const [metaResetKey, setMetaResetKey] = useState(0);

  const handleChange = (field, value) => {
    setCustomLocation(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const handleEstimate = () => {
    if (!customLocation.latitude || !customLocation.longitude) return;

    const result = estimateFieldsFromNearby(
      customLocation.latitude,
      customLocation.longitude,
      tiendas,
      customLocation.radius
    );

    setGuesses(result);
  };

   const handleEvaluate = () => {
    if (!guesses || !customLocation.latitude || !customLocation.longitude) return;

    const payload = {
      latitud: customLocation.latitude,
      longitud: customLocation.longitude,
      radio: customLocation.radius,
      entorno: guesses.entorno_des,
      segmento: guesses.segmento_maestro_desc,
      nivel: guesses.nivelsocioeconomico_des,
      plaza: guesses.plaza_cve,
      ubicacion: guesses.lid_ubicacion_tienda
    };

    predictMeta(payload);
  };

  useEffect(() => {
    setGuesses(null);
    setMetaResetKey(prev => prev + 1); // resets the prediction hook
  }, [customLocation.latitude, customLocation.longitude]);

  return (
    <div className="bg-zinc-800 text-gray-100 flex flex-col w-1/4 h-screen m-8">
      <h1 className="font-bold text-4xl pb-8">Ve las proyecciones</h1>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="longitude">Longitud</label>
                <input type="number" id="longitude" className="bg-zinc-700 text-gray-100 p-2 rounded" placeholder="Ingresa la longitud"  value={customLocation.longitude ?? ''}  onChange={(e) => handleChange("longitude", e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="latitude">Latitud</label>
                <input type="number" id="latitude" className="bg-zinc-700 text-gray-100 p-2 rounded" placeholder="Ingresa la latitud" value={customLocation.latitude ?? ''} onChange={(e) => handleChange("latitude", e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="radio">Radio</label>
                <input type="range" id="radio" className="bg-zinc-700 text-gray-100 p-2 rounded" min="100" max="2500" step="25" value={customLocation.radius} onChange={(e) => handleChange("radius", e.target.value)}/>
                <span>{customLocation.radius} metros</span>
            </div>

            {!guesses ? (
              <button onClick={handleEstimate} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Generar valores estimados
              </button>
            ) : (
              <button onClick={handleEvaluate} className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Evaluar ubicación
              </button>
            )}

            {guesses && (
              <div className="mt-4 bg-zinc-700 p-4 rounded text-sm space-y-1">
                <p><strong>Entorno:</strong> {guesses.entorno_des}</p>
                <p><strong>Segmento:</strong> {guesses.segmento_maestro_desc}</p>
                <p><strong>Nivel Socioeconómico:</strong> {guesses.nivelsocioeconomico_des}</p>
                <p><strong>Plaza:</strong> {guesses.plaza_cve}</p>
                <p><strong>Ubicación:</strong> {guesses.lid_ubicacion_tienda}</p>
                <p><strong>Cajones de Estacionamiento:</strong> {guesses.cajonesestacionamiento_num}</p>
                <p><strong>Área de Ventas:</strong> {guesses.mts2ventas_num} m²</p>
                <p><strong>Refrigeradores:</strong> {guesses.puertasrefrig_num}</p>
              </div>
            )}

            {metaLoading && <p className="text-yellow-300 mt-2">Evaluando ubicación...</p>}
            {metaError && <p className="text-red-500 mt-2">{metaError}</p>}

            {metaResult && (
              <div className="mt-4 bg-green-800 text-white p-4 rounded">
                <p><strong>Venta prevista:</strong> {metaResult.Venta_Prevista}</p>
                <p><strong>¿Cumple la meta?</strong> {metaResult.Cumplio_Meta ? '✅ Sí' : '❌ No'}</p>
              </div>
            )}

        </div>
    </div>
  );
}
