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

  const handleAddHorario = () => {
    setHorarios([
      ...horarios,
      { id: (horarios.length + 1).toString(), ...newHorario }
    ]);
    setNewHorario({ grupo: '', materia: '', profesor: '', inicio: '', fin: '' });
  };

  return (
    <div className="horarios-container">
      <aside className="sidebar">
        <h2><b>Menú</b></h2>
        <ul>
          <li><b>Generar Horarios</b></li>
          <li>Dar de alta profesores/alumnos</li>
          <li>Administrar información de la escuela</li>
        </ul>
      </aside>

      <div className="horarios-content">
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
          </div>

        </div>

        <div className=''>
          <div className="calendars-section">
            <div className="calendar-card"> {/* Calendario 1 */}                      
              <table>
                  <tr>
                      <th>Hora</th>
                      <th>Lunes</th>
                      <th>Martes</th>
                      <th>Miércoles</th>
                      <th>Jueves</th>
                      <th>Viernes</th>
                  </tr>
                  <tr>
                      <td>5:00 - 6:00</td>
                      <td>ADT</td>
                      <td>Mate</td>
                      <td>Metp</td>
                      <td>Mate</td>
                      <td>EDU</td>
                  </tr>
                  <tr>
                      <td>6:00 - 7:00</td>
                      <td>ADS</td>
                      <td>ADT</td>
                      <td>Mate</td>
                      <td>ADS</td>
                      <td>EDU</td>
                  </tr>
                  <tr>
                      <td>7:00 - 8:00</td>
                      <td>ADS</td>
                      <td>Metp</td>
                      <td>ADS</td>
                      <td>SI</td>
                      <td>SI</td>
                  </tr>
                  <tr>
                      <td>8:00 - 9:00</td>
                      <td>II</td>
                      <td>II</td>
                      <td>II</td>
                      <td>II</td>
                      <td>Mate</td>
                  </tr>
                  <tr>
                      <td>9:00 - 10:00</td>
                      <td>SI</td>
                      <td>ADS</td>
                      <td>EDU</td>
                      <td>ADT</td>
                      <td>Metp</td>
                  </tr>
              </table>
            </div>
            <div className="calendar-card"> {/* Calendario 2 */}
              <img src="/calendar-placeholder.png" alt="Calendar 2" />
            </div>
            <div className="calendar-card"> {/* Calendario 3 */}
              <img src="/calendar-placeholder.png" alt="Calendar 3" />
            </div>
          </div>
          <button className="generate-button">Generar más Horarios</button>
        </div>


        <div className="send-schedule-section">
          <button className="send-schedule-button">Enviar horarios a Profesores y Alumnos</button>
        </div>
      </div>
    </div>
  );
};

export default Horarios;
