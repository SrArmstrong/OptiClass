import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HorariosTable.css'; // Estilos personalizados para la tabla

const HorariosTable = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { correo, tipo } = location.state || {}; 

  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Correo recibido:', correo); // Para verificar que el correo se pasó correctamente
  }, [correo]);

  // Función para obtener y mostrar los datos
  const fetchAndDisplayData = async () => {
    try {
      const response = await fetch('http://localhost:3001/obtenerHorarios', {
        method: 'POST', // Cambiar a POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }), // Incluir el correo en el cuerpo
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los datos del horario');
      }
  
      const data = await response.json();
      setHorarios(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAndDisplayData();
  }, []);

  if (loading) {
    return <div className="loading">Cargando horarios...</div>;
  }

  // Organizar horarios por grupo, hora y día
  const horariosPorGrupo = horarios.reduce((acc, horario) => {
    const { grupo, hora_inicio, dia, materia, profesor, aula } = horario;

    if (!acc[grupo]) {
      acc[grupo] = {};
    }

    if (!acc[grupo][hora_inicio]) {
      acc[grupo][hora_inicio] = {};
    }

    acc[grupo][hora_inicio][dia] = { materia, profesor, aula };
    return acc;
  }, {});

  // Los días de la semana en orden
  const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  return (
    <div className="horarios-container">
      
      <aside className="sidebar">
        <h1>Menú</h1>
        <ul>
          <li><a onClick={() => navigate('/Alumnos', { state: { correo: correo, tipo: tipo } })}>Encuesta de profesores</a></li>
          <li><a onClick={() => navigate('/HorariosAlumnos', { state: { correo: correo, tipo: tipo } })}>Horarios</a></li>
          <li>
            <p><strong>Correo:</strong> {correo}</p>
          </li>
          <li>
            <p><strong>Tipo de Usuario:</strong> {tipo}</p>
          </li>
        </ul>
      </aside>

      {Object.keys(horariosPorGrupo).map((grupo) => (
        <div key={grupo} className="grupo-section">
          <h2>Horario para el Grupo: {grupo}</h2>
          <div className="horarios-table-container">
            <table className="horarios-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  {diasDeLaSemana.map((dia) => (
                    <th key={dia}>{dia}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(horariosPorGrupo[grupo]).map((hora) => (
                  <tr key={hora}>
                    <td>{hora}</td>
                    {diasDeLaSemana.map((dia) => {
                      const horario = horariosPorGrupo[grupo][hora][dia];
                      return (
                        <td key={dia}>
                          {horario ? (
                            <div>
                              <p>{horario.materia}</p>
                              <p>{horario.profesor}</p>
                              <p>{`Edificio: ${horario.aula.split(',')[0]}, Aula: ${horario.aula.split(',')[1]}`}</p>
                            </div>
                          ) : (
                            'Sin clase'
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorariosTable;
