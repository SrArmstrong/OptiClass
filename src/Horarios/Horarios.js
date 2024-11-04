// src/Horarios.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Horarios.css';  // Importa el archivo de estilos

const Horarios = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correo, tipo } = location.state || {};

  // Validación de correo y tipo
  useEffect(() => {
    if (!correo || !tipo) {
      // Si no hay correo o tipo es inválido, redirige al index 
      navigate('/');
    }
  }, [correo, tipo, navigate]);

  const [horarios, setHorarios] = useState([
    { 
      id: '1', 
      grupo: '1', 
      materia: 'Matemáticas', 
      profesor: 'Profesor A', 
      inicio: '2024-09-10T08:00:00', 
      fin: '2024-09-10T08:50:00' 
    },
    { 
      id: '2', 
      grupo: '2', 
      materia: 'Historia', 
      profesor: 'Profesor B', 
      inicio: '2024-09-10T09:00:00', 
      fin: '2024-09-10T09:50:00' 
    }
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


      <div className="navbar-left">
        <h2>Menú</h2>
        <hr />
        <ul>
          <li><a href="#">Ver Horarios</a></li>
          <li><a href="#">Agregar Horario</a></li>
          <li><a href="#">Configuración</a></li>
        </ul>
      </div>



      <div className="horarios-content">
        <h1>Horarios</h1>
        <p>Correo: {correo}</p>
        <p>Tipo: {tipo}</p>
      
        <ul id="horarios">
          {horarios.map(horario => (
            <li key={horario.id}>
              Grupo: {horario.grupo} - Materia: {horario.materia} - Profesor: {horario.profesor} - Inicio: {new Date(horario.inicio).toLocaleTimeString()} - Fin: {new Date(horario.fin).toLocaleTimeString()}
            </li>
          ))}
        </ul>

        <div id="agregar-horario">
          <h2>Agregar Horario</h2>
          <input
            type="text"
            placeholder="Profesor"
            value={newHorario.profesor}
            onChange={(e) => setNewHorario({ ...newHorario, profesor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Materia"
            value={newHorario.materia}
            onChange={(e) => setNewHorario({ ...newHorario, materia: e.target.value })}
          />
          <input
            type="text"
            placeholder="Grupos"
            value={newHorario.grupo}
            onChange={(e) => setNewHorario({ ...newHorario, grupo: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newHorario.inicio}
            onChange={(e) => setNewHorario({ ...newHorario, inicio: e.target.value })}
          />
          <input
            type="datetime-local"
            value={newHorario.fin}
            onChange={(e) => setNewHorario({ ...newHorario, fin: e.target.value })}
          />
          <button onClick={handleAddHorario}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default Horarios;
