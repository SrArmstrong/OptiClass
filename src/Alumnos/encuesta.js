import React, { useState } from 'react';
import './encuesta.css';

function EncuestaProfesores() {
  const [respuestas, setRespuestas] = useState({
    criterioClase: '',
    terminaTiempo: '',
    llegaTiempo: '',
    ejemplosClaros: '',
    objetivosClase: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Respuestas:', respuestas);
    // Aquí puedes agregar la lógica para enviar las respuestas al backend.
  };

  return (
    <div className="encuesta-container">

      {/*navbar*/}
      <aside className="sidebar">
        <h2>Menú</h2>
        <ul>
          <li>Encuesta de profesores</li>
          <li>Horarios</li>
        </ul>
      </aside>


      <div className="content">
        <h1>Encuesta de Profesores</h1>
        <div className="profesor-info">
          <img src="https://via.placeholder.com/100" alt="Sofía García" className="profesor-foto" />
          <h2>Sofía García</h2>
          <p>Profesora</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="preguntas">
  <div className="columna">
    <div className="pregunta">
      <p>¿El profesor compartió los criterios de clase?</p>
      <label>
        <input type="radio" name="criterioClase" value="si" onChange={handleChange} /> Sí
      </label>
      <label>
        <input type="radio" name="criterioClase" value="no" onChange={handleChange} /> No
      </label>
    </div>
    <div className="pregunta">
      <p>¿El profesor terminaba sus clases a tiempo?</p>
      <label>
        <input type="radio" name="terminaTiempo" value="si" onChange={handleChange} /> Sí
      </label>
      <label>
        <input type="radio" name="terminaTiempo" value="no" onChange={handleChange} /> No
      </label>
    </div>
    <div className="pregunta">
      <p>¿El profesor llegaba a tiempo a sus clases?</p>
      <label>
        <input type="radio" name="llegaTiempo" value="si" onChange={handleChange} /> Sí
      </label>
      <label>
        <input type="radio" name="llegaTiempo" value="no" onChange={handleChange} /> No
      </label>
    </div>
  </div>
  <div className="columna">
    <div className="pregunta">
      <p>¿Proporciona ejemplos claros y relevantes durante las explicaciones?</p>
      <label>
        <input type="radio" name="ejemplosClaros" value="si" onChange={handleChange} /> Sí
      </label>
      <label>
        <input type="radio" name="ejemplosClaros" value="no" onChange={handleChange} /> No
      </label>
    </div>
    <div className="pregunta">
      <p>¿El profesor explica claramente los objetivos de cada clase?</p>
      <label>
        <input type="radio" name="objetivosClase" value="si" onChange={handleChange} /> Sí
      </label>
      <label>
        <input type="radio" name="objetivosClase" value="no" onChange={handleChange} /> No
      </label>
    </div>
    <button type="submit" className="submit-button">Enviar</button>
  </div>
</div>

        </form>
      </div>
    </div>
  );
}

export default EncuestaProfesores;
