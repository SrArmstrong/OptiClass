// src/Horarios.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Horarios.css'; // Importa el archivo de estilos

const Horarios = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correo, tipo } = location.state || {};
/*
  useEffect(() => {
    if (!correo || !tipo) {
      navigate('/');
    }
  }, [correo, tipo, navigate]);
*/
  const [dataCache, setDataCache] = useState(null);
  const [horarios, setHorarios] = useState(null);

  const guardarHorarios = async () => {
    if (!horarios) {
      alert('No hay horarios generados para guardar. Por favor, genere los horarios primero.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/guardarHorarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(horarios), // Envía el objeto completo
      });
  
      if (response.ok) {
        alert('Horarios guardados exitosamente en la base de datos.');
      } else {
        const errorMessage = await response.text();
        console.error('Error al guardar los horarios en la base de datos:', errorMessage);
      }
    } catch (error) {
      console.error('Error al intentar guardar los horarios:', error);
    }
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
  
    const nuevosHorarios = dataCache.Grupos.map(grupo => {
      // Determina un horario fijo para la materia "II"
      const horaFija = "8:00 - 9:00"; // Ajusta la hora según sea necesario
      const diasFijosII = ["Lunes", "Martes", "Miércoles", "Jueves"];
      const asignaturaII = "II";
  
      // Lista de horarios disponibles
      const horariosDisponibles = ["5:00 - 6:00", "6:00 - 7:00", "7:00 - 8:00", "8:00 - 9:00", "9:00 - 10:00"];
  
      // Generar horarios para el grupo
      const horarios = horariosDisponibles.map(horaIntervalo => {
        const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(dia => {
          // Si es un día fijo y el horario coincide con el fijo, asigna "II"
          if (diasFijosII.includes(dia) && horaIntervalo === horaFija) {
            const profesorII = dataCache.Profesores.find(prof => prof.asignatura === asignaturaII) || {};
            return {
              dia,
              asignatura: asignaturaII,
              profesor: `${profesorII.profesor || "Profesor II"} ${profesorII.appaterno || ""} ${profesorII.apmaterno || ""}`,
              edificio: profesorII.edificio || "Edificio A",
              aula: profesorII.aula || "101",
            };
          }
  
          // Para el resto de horarios y días, asigna otras materias
          const profesor = dataCache.Profesores[Math.floor(Math.random() * dataCache.Profesores.length)];
          return {
            dia,
            asignatura: profesor.asignatura || "Asignatura General",
            profesor: `${profesor.profesor || "N/A"} ${profesor.appaterno || "N/A"} ${profesor.apmaterno || "N/A"}`,
            edificio: profesor.edificio || "N/A",
            aula: profesor.aula || "N/A",
          };
        });
  
        return { hora: horaIntervalo, dias };
      });
  
      return { id: grupo.id_grupo, nombre: grupo.nombre, horarios };
    });
  
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
          <li><b><a onClick={() => navigate('/horarios')}>Generar Horarios</a></b></li>
          <li><a onClick={() => navigate('/registroproal')}>Dar de alta profesores/alumnos</a></li>
          <li><a onClick={() => navigate('/restricciones')}>Restricciones de la escuela</a></li>
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
            <button className="send-button" onClick={guardarHorarios}>Enviar</button>
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
