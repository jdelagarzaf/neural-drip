export default function Input() {
  return (
    <div className="bg-zinc-800 text-gray-100 flex flex-col w-1/4 h-screen m-8">
      <h1 className="font-bold text-4xl pb-8">Input</h1>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
            <label htmlFor="plaza">Plaza</label>
            
            </div>
            <div className="flex flex-col">
            <label htmlFor="nivel">Nivel Socioeconómico</label>
            
            </div>
            <div className="flex flex-col">
                <label htmlFor="entorno">Entorno</label>
                
            </div>
            <div className="flex flex-col">
                <label htmlFor="segmento">Segmento</label>
                
            </div>
            <div className="flex flex-col">
                <label htmlFor="ubicacion">Ubicación</label>
                
            </div>
        </div>
    </div>
  );
}
