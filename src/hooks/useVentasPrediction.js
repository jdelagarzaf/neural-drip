import { useState } from "react";

export default function useVentasPrediction() {
  const [metaResult, setMetaResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictMeta = async (payload) => {
    setLoading(true);
    setError(null);
    setMetaResult(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_FLASK_URL}/evaluar_ubicacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Error al evaluar la ubicación");

      const json = await res.json();
      setMetaResult(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { metaResult, loading, error, predictMeta };
}
