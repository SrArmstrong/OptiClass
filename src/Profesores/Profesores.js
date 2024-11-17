import React, { useState } from 'react';

const Profesores = () => {
  const [profesores, setProfesores] = useState([]);
  const [newProfesor, setNewProfesor] = useState({
    nombre: '',
    materias: '',
    grupo: '',
    diasDisponibles: [], // Para seleccionar los días de trabajo
    horasTrabajo: {}, // Para ingresar las horas de trabajo por día
    tiempo_completo: false
  });

  const handleAddProfesor = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/profesores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProfesor)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.message);
      setProfesores([...profesores, newProfesor]);
      setNewProfesor({ nombre: '', materias: '', grupo: '', diasDisponibles: [], horasTrabajo: {}, tiempo_completo: false });
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

  const handleHorasChange = (dia, horas) => {
    setNewProfesor((prevState) => {
      const horasTrabajo = { ...prevState.horasTrabajo, [dia]: horas };
      return { ...prevState, horasTrabajo };
    });
  };

  return (
    <div>
      
      {/*navbar*/}
      <aside className="sidebar">
        <h1>Menú</h1>
        <ul>
          <li>Encuesta de profesores</li>
          <li>Horarios</li>
        </ul>
      </aside>


      <h1 className='title'>Profesores</h1>
      <ul>
        {profesores.map((profesor, index) => (
          <li key={index}>
            {profesor.nombre} - Materias: {profesor.materias} - Grupo: {profesor.grupo} - Días: {profesor.diasDisponibles.join(', ')} - Tiempo Completo: {profesor.tiempo_completo ? 'Sí' : 'No'}
          </li>
        ))}
      </ul>
      <div>
        <h2>Agregar Profesor</h2>
        <input
          type="text"
          placeholder="Nombre del profesor"
          value={newProfesor.nombre}
          onChange={(e) => setNewProfesor({ ...newProfesor, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido Paterno"
          value={newProfesor.materias}
          onChange={(e) => setNewProfesor({ ...newProfesor, materias: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido Materno"
          value={newProfesor.materias}
          onChange={(e) => setNewProfesor({ ...newProfesor, materias: e.target.value })}
        />
        <input
          type="text"
          placeholder="Materias (separadas por coma)"
          value={newProfesor.materias}
          onChange={(e) => setNewProfesor({ ...newProfesor, materias: e.target.value })}
        />

        <h3>Días Disponibles y Horas</h3>
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
          <div key={dia}>
            <label>
              <input
                type="checkbox"
                checked={newProfesor.diasDisponibles.includes(dia)}
                onChange={() => handleDiaChange(dia)}
              />
              {dia}
            </label>

            {/* Mostrar campo de horas solo si el día está seleccionado */}
            {newProfesor.diasDisponibles.includes(dia) && (
              <div>
                <label>Horas de trabajo para {dia}: </label>
                <input
                  type="text"
                  placeholder="Ejemplo: 08:00 - 14:00"
                  value={newProfesor.horasTrabajo[dia] || ''}
                  onChange={(e) => handleHorasChange(dia, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}

        <label>
          Tiempo Completo:
          <input
            type="checkbox"
            checked={newProfesor.tiempo_completo}
            onChange={(e) => setNewProfesor({ ...newProfesor, tiempo_completo: e.target.checked })}
          />
        </label>

        <button onClick={handleAddProfesor}>Agregar</button>
      </div>
    </div>
  );
};

export default Profesores;
