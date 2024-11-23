import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Profesores = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { correo, tipo } = location.state || {};

  const [profesores, setProfesores] = useState([]);
  const [newProfesor, setNewProfesor] = useState({
    nombre: '',
    materias: '',
    grupo: '',
    diasDisponibles: [],
    horasTrabajo: {},
    tiempo_completo: false,
    medio_tiempo: false,
  });

  const handleAddProfesor = async () => {
    if (
      (!newProfesor.tiempo_completo && !newProfesor.medio_tiempo) &&
      newProfesor.diasDisponibles.length === 0
    ) {
      alert('Debe seleccionar al menos un día o elegir Tiempo Completo o Medio Tiempo');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/guardarPeticiones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_profesor: correo,
          diasDisponibles: JSON.stringify(newProfesor.diasDisponibles),
          horasTrabajo: JSON.stringify(newProfesor.horasTrabajo),
          tiempo_completo: newProfesor.tiempo_completo,
          fecha_peticion: new Date().toISOString().slice(0, 19).replace("T", " "),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);

      setProfesores([...profesores, newProfesor]);
      setNewProfesor({
        nombre: '',
        materias: '',
        grupo: '',
        diasDisponibles: [],
        horasTrabajo: {},
        tiempo_completo: false,
        medio_tiempo: false,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDiaChange = (dia) => {
    setNewProfesor((prevState) => {
      const diasDisponibles = prevState.diasDisponibles.includes(dia)
        ? prevState.diasDisponibles.filter((d) => d !== dia)
        : [...prevState.diasDisponibles, dia];
      return { ...prevState, diasDisponibles };
    });
  };

  const handleHoraInicioChange = (dia, horaInicio) => {
    setNewProfesor((prevState) => {
      const horasTrabajo = {
        ...prevState.horasTrabajo,
        [dia]: { ...prevState.horasTrabajo[dia], inicio: horaInicio },
      };
      return { ...prevState, horasTrabajo };
    });
  };

  const handleHoraFinChange = (dia, horaFin) => {
    setNewProfesor((prevState) => {
      const horasTrabajo = {
        ...prevState.horasTrabajo,
        [dia]: { ...prevState.horasTrabajo[dia], fin: horaFin },
      };
      return { ...prevState, horasTrabajo };
    });
  };

  const handleTiempoCompletoChange = () => {
    setNewProfesor((prevState) => {
      const diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
      const horasTrabajo = diasDisponibles.reduce((acc, dia) => {
        acc[dia] = { inicio: '08:00', fin: '13:00' };
        return acc;
      }, {});

      return {
        ...prevState,
        tiempo_completo: !prevState.tiempo_completo,
        medio_tiempo: false,
        diasDisponibles: !prevState.tiempo_completo ? [] : diasDisponibles,
        horasTrabajo: !prevState.tiempo_completo ? {} : horasTrabajo,
      };
    });
  };

  const handleMedioTiempoChange = () => {
    setNewProfesor((prevState) => {
      const diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
      const horasTrabajo = diasDisponibles.reduce((acc, dia) => {
        acc[dia] = { inicio: '08:00', fin: '10:00' };
        return acc;
      }, {});

      return {
        ...prevState,
        medio_tiempo: !prevState.medio_tiempo,
        tiempo_completo: false,
        diasDisponibles: !prevState.medio_tiempo ? [] : diasDisponibles,
        horasTrabajo: !prevState.medio_tiempo ? {} : horasTrabajo,
      };
    });
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h1>Menú</h1>
        <ul>
          <li><a onClick={() => navigate('/Estadisticas', { state: { correo, tipo } })}>Estadísticas</a></li>
          <li><a onClick={() => navigate('/Profesores', { state: { correo, tipo } })}>Preferencias</a></li>
          <li><a onClick={() => navigate('/HorariosProfesores', { state: { correo, tipo } })}>Horarios</a></li>
          <li>
            <p><strong>Correo:</strong> {correo}</p>
          </li>
          <li>
            <p><strong>Tipo de Usuario:</strong> {tipo}</p>
          </li>
        </ul>
      </aside>

      <div className="content">
        <h1 className="title">Profesores</h1>
        <ul>
          {profesores.map((profesor, index) => (
            <li key={index}>
              {profesor.nombre} - Materias: {profesor.materias} - Grupo: {profesor.grupo} - Días: {profesor.diasDisponibles.join(', ')} - Tiempo Completo: {profesor.tiempo_completo ? 'Sí' : 'No'} - Medio Tiempo: {profesor.medio_tiempo ? 'Sí' : 'No'}
            </li>
          ))}
        </ul>
        <h3>Días y Horas que desea trabajar</h3>

        <div className="inputScrollContainer">
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((dia) => (
            <div key={dia} className="diaContainer">
              <label>
                <input
                  type="checkbox"
                  disabled={newProfesor.tiempo_completo || newProfesor.medio_tiempo}
                  checked={newProfesor.diasDisponibles.includes(dia)}
                  onChange={() => handleDiaChange(dia)}
                />
                {dia}
              </label>

              {newProfesor.diasDisponibles.includes(dia) && (
                <div className="horaContainer">
                  <label>Hora de inicio para {dia}: </label>
                  <input
                    type="time"
                    value={newProfesor.horasTrabajo[dia]?.inicio || ''}
                    onChange={(e) => handleHoraInicioChange(dia, e.target.value)}
                  />
                  <label>Hora de fin para {dia}: </label>
                  <input
                    type="time"
                    value={newProfesor.horasTrabajo[dia]?.fin || ''}
                    onChange={(e) => handleHoraFinChange(dia, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="checkboxGroup">
          <label>
            Tiempo Completo:
            <input
              type="checkbox"
              checked={newProfesor.tiempo_completo}
              onChange={handleTiempoCompletoChange}
            />
          </label>
          <label>
            Medio Tiempo:
            <input
              type="checkbox"
              checked={newProfesor.medio_tiempo}
              onChange={handleMedioTiempoChange}
            />
          </label>
        </div>

        <button onClick={handleAddProfesor} className="addButton">Agregar</button>
      </div>
    </div>
  );
};

export default Profesores;
