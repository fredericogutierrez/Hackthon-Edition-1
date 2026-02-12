import { useEffect, useState } from "react";
import axios from "axios";

export default function Mars() {
  const [mars, setMars] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/mars")
      .then(res => setMars(res.data))
      .catch(() => setErro("Erro ao carregar dados de Marte"));
  }, []);


  if (!mars) return <div className="mars-container">Carregando dados de Marte...</div>;
  return (
    <div className="mars-container">
      <div className="mars-card">
        <h1>Clima em Marte</h1>
        <h2>Sol {mars.sol}</h2>
        <p><b>Estação:</b> {mars.estacao}</p>


        <div className="mars-grid">
          <div>
            <h3>Temperatura (°C)</h3>
            <p>Média: {mars.temperatura.media}</p>
            <p>Máx: {mars.temperatura.max}</p>
            <p>Mín: {mars.temperatura.min}</p>
          </div>

          <div>
            <h3>Pressão</h3>
            <p>Média: {mars.pressao.media}</p>
            <p>Máx: {mars.pressao.max}</p>
            <p>Mín: {mars.pressao.min}</p>
          </div>

          <div>
            <h3>Vento</h3>
            <p>Média: {mars.vento.media}</p>
            <p>Máx: {mars.vento.max}</p>
            <p>Mín: {mars.vento.min}</p>
          </div>
        </div>
      </div>
    </div>
  );
}