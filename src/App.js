import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tiempo, setTiempo] = useState({ minutos: 0, segundos: 0, milisegundos: 0 });
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let intervalo;

    if (activo) {
      intervalo = setInterval(() => {
        setTiempo(tiempo => {
          let nuevosMilisegundos = tiempo.milisegundos + 10;
          let nuevosSegundos = tiempo.segundos;
          let nuevosMinutos = tiempo.minutos;

          if (nuevosMilisegundos === 1000) {
            nuevosSegundos++;
            nuevosMilisegundos = 0;
          }
          if (nuevosSegundos === 60) {
            nuevosMinutos++;
            nuevosSegundos = 0;
          }

          return { minutos: nuevosMinutos, segundos: nuevosSegundos, milisegundos: nuevosMilisegundos };
        });
      }, 10);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo]);

  const iniciarCronometro = () => {
    setActivo(true);
  };

  const detenerCronometro = () => {
    setActivo(false);
  };

  const reiniciarCronometro = () => {
    setTiempo({ minutos: 0, segundos: 0, milisegundos: 0 });
    setActivo(false);
  };

  return (
    <div className="App">
      <h1>Cronómetro</h1>
      <div className="cronometro-container">
        <div className="esfera">
          {[...Array(12)].map((_, index) => {
            const angulo = index * 30;
            const x = 100 + 80 * Math.sin(angulo * Math.PI / 180);
            const y = 100 - 80 * Math.cos(angulo * Math.PI / 180);
            return (
              <div
                key={index}
                className={`numero`}
                style={{
                  position: 'absolute',
                  left: x + 'px',
                  top: y + 'px',
                  transform: 'translate(-50%, -50%)', // Añadido para centrar el número
                }}
              >
                {index + 1}
              </div>
            );
          })}
          <div
            className="aguja"
            style={{
              transform: `rotate(${(tiempo.segundos * 6 + tiempo.milisegundos / 166.7)}deg)`,
            }}
          ></div>
        </div>
        <div className="cronometro">
          {tiempo.minutos}m {tiempo.segundos}s {tiempo.milisegundos}ms
        </div>
        <div className="botones">
          {!activo ? (
            <button onClick={iniciarCronometro}>Iniciar</button>
          ) : (
            <button onClick={detenerCronometro}>Detener</button>
          )}
          <button onClick={reiniciarCronometro}>Reiniciar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
