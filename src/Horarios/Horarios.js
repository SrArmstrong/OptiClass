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

  const [horarios, setHorarios] = useState([
    { id: '1', grupo: '1', materia: 'Matemáticas', profesor: 'Profesor A', inicio: '2024-09-10T08:00:00', fin: '2024-09-10T08:50:00' },
    { id: '2', grupo: '2', materia: 'Historia', profesor: 'Profesor B', inicio: '2024-09-10T09:00:00', fin: '2024-09-10T09:50:00' }
  ]);

  const [newHorario, setNewHorario] = useState({
    grupo: '',
    materia: '',
    profesor: '',
    inicio: '',
    fin: ''
  });

  const [dataCache, setDataCache] = useState(null);

  const handleAddHorario = () => {
    setHorarios([
      ...horarios,
      { id: (horarios.length + 1).toString(), ...newHorario }
    ]);
    setNewHorario({ grupo: '', materia: '', profesor: '', inicio: '', fin: '' });
  };

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

    return dataCache.Grupos.map(grupo => (
      <div key={grupo.id_grupo} className="grupo-section">
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
            {["5:00 - 6:00", "6:00 - 7:00", "7:00 - 8:00", "8:00 - 9:00", "9:00 - 10:00"].map(horaIntervalo => (
              <tr key={horaIntervalo}>
                <td>{horaIntervalo}</td>
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(dia => {
                  const profesor = dataCache.Profesores[Math.floor(Math.random() * dataCache.Profesores.length)];
                  return (
                    <td key={dia}>
                      <div><b>{profesor.asignatura || 'N/A'}</b></div>
                      {profesor.profesor || 'N/A'} {profesor.appaterno || 'N/A'} {profesor.apmaterno || 'N/A'}<br />
                      Edificio: {profesor.edificio || 'N/A'}, Aula: {profesor.aula || 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
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

      <div className="horarios-content">
        <h1 className='title'> Generar Horarios </h1>
        <div className="header-section">
          <div className="header-box">
            <div>
              <h3>Análisis de valoración de profesores</h3>
              <p>Última valoración de profesores realizado el: 10/09/24</p>
            </div>
            <button className="send-button">Enviar</button>
          </div>

          <div className="header-box">
            <div>
              <h3>Generación de Horarios</h3>
              <p>Última generación realizado el: 10/09/24</p>
            </div>
            <button className="send-button">Enviar</button>
            <button onClick={generarHorarios} className="generate-button">Generar Horarios</button>
          </div>
        </div>

        <div className="calendars-section">
          <div className="calendar-card">
            {dataCache ? generarHorarios() : <p>Cargando datos...</p>}
          </div>
        </div>

        <div className="send-schedule-section">
          <button className="send-schedule-button">Enviar horarios a Profesores y Alumnos</button>
        </div>
      </div>
    </div>
  );
};

export default Horarios;
