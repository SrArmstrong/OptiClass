// src/Horarios.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Horarios.css'; // Importa el archivo de estilos

const Horarios = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correo, tipo } = location.state || {};

  useEffect(() => {
    if (!correo || !tipo) {
      navigate('/');
    }
  }, [correo, tipo, navigate]);

  const [dataCache, setDataCache] = useState(null);
  const [horarios, setHorarios] = useState(null);

  const fetchAndDisplayData = async () => {
    try {
      const response = await fetch('http://localhost:3001/datosPhorarios');
      const data = await response.json();
      setDataCache(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const generarHorarios = () => {
    if (!dataCache) {
      alert('Los datos no están disponibles. Por favor, recargue la página.');
      return;
    }

    const nuevosHorarios = dataCache.Grupos.map(grupo => ({
      id: grupo.id_grupo,
      nombre: grupo.nombre,
      horarios: ["5:00 - 6:00", "6:00 - 7:00", "7:00 - 8:00", "8:00 - 9:00", "9:00 - 10:00"].map(horaIntervalo => ({
        hora: horaIntervalo,
        dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(dia => {
          const profesor = dataCache.Profesores[Math.floor(Math.random() * dataCache.Profesores.length)];
          return {
            dia,
            asignatura: profesor.asignatura || 'N/A',
            profesor: `${profesor.profesor || 'N/A'} ${profesor.appaterno || 'N/A'} ${profesor.apmaterno || 'N/A'}`,
            edificio: profesor.edificio || 'N/A',
            aula: profesor.aula || 'N/A',
          };
        }),
      })),
    }));

    setHorarios(nuevosHorarios);
  };

  useEffect(() => {
    fetchAndDisplayData();
  }, []);

  return (
    <div className="horarios-container">
      <aside className="sidebar">
        <h1><b>Menú</b></h1>
        <ul>
          <li><b>Generar Horarios</b></li>
          <li><a onClick={() => navigate('/registroproal')}>Dar de alta profesores/alumnos</a></li>
          <li>Administrar información de la escuela</li>
        </ul>
      </aside>
  
      <div className="columnas">
        <div className="header-section">
          <div className="header-box">
            <h3>Análisis de valoración de profesores</h3>
            <p>Última valoración de profesores realizado el: 10/09/24</p>
            <button className="send-button">Enviar</button>
          </div>
  
          <div className="header-box">
            <h3>Generación de Horarios</h3>
            <p>Última generación realizado el: 10/09/24</p>
            <button className="send-button">Enviar</button>
            <button onClick={generarHorarios} className="generate-button">Generar Horarios</button>
          </div>
        </div>
  
        <div className="horarios-content">
          <div className="calendars-section">
            {horarios ? (
              horarios.map(grupo => (
                <div key={grupo.id} className="grupo-section">
                  <h3>Horario para el Grupo: {grupo.nombre}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Hora</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grupo.horarios.map(({ hora, dias }) => (
                        <tr key={hora}>
                          <td>{hora}</td>
                          {dias.map(({ dia, asignatura, profesor, edificio, aula }) => (
                            <td key={dia}>
                              <div><b>{asignatura}</b></div>
                              {profesor}<br />
                              Edificio: {edificio}, Aula: {aula}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p>Cargando datos o haga clic en "Generar Horarios" para comenzar...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Horarios;
