import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Horarios.css'; // Mantiene los estilos de la sidebar

const RestriccionesEscuela = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { correo, tipo } = location.state || {};


  const [restricciones, setRestricciones] = useState({
    horaInicio: '',
    horaTermino: '',
    numRecesos: '',
    duracionRecesos: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestricciones({
      ...restricciones,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos al servidor para guardar restricciones
      const response = await axios.post('http://localhost:3001/restricciones', restricciones);
      console.log(response.data); // Muestra la respuesta de la solicitud
      alert("Restricciones guardadas correctamente");
      setRestricciones({
        horaInicio: '',
        horaTermino: '',
        numRecesos: '',
        duracionRecesos: '',
      }); // Limpiar el formulario después del envío
    } catch (error) {
      console.error('Error al guardar restricciones', error);
      alert("Hubo un error al guardar las restricciones");
    }
  };

  return (
    <div className="horarios-container">
      <aside className="sidebar">
        <h2><b>Menú</b></h2>
        <ul>
          <li><a onClick={() => navigate('/horarios')}>Generar Horarios</a></li>
          <li><a onClick={() => navigate('/registroproal')}>Dar de alta Profesores/Alumnos</a></li>
          <li><a onClick={() => navigate('/restricciones')}><b>Restricciones de la escuela</b></a></li>
          <li>Administrar Información de la Escuela</li>
        </ul>
      </aside>
      
      <div className="form-content">
        <h1 style={{ textAlign: 'center' }}>Restricciones de la Escuela</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Hora de Inicio:</label>
            <input
              type="time"
              name="horaInicio"
              value={restricciones.horaInicio}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Hora de Término:</label>
            <input
              type="time"
              name="horaTermino"
              value={restricciones.horaTermino}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Número de Recesos:</label>
            <input
              type="number"
              name="numRecesos"
              value={restricciones.numRecesos}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div>
            <label>Duración de Recesos (en minutos):</label>
            <input
              type="number"
              name="duracionRecesos"
              value={restricciones.duracionRecesos}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <button type="submit">Guardar Restricciones</button>
        </form>
      </div>
    </div>
  );
};

export default RestriccionesEscuela;