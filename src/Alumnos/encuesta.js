import React, { useState } from 'react';
import './encuesta.css';

function EncuestaProfesores() {
  const [respuestas, setRespuestas] = useState({
    criterioClase: '',
    terminaTiempo: '',
    llegaTiempo: '',
    ejemplosClaros: '',
    objetivosClase: '',
    retroalimentacion: '',
    empatia: '',
    claridadRespuestas: '',
    metodosEnseñanza: '',
    participacionEstudiantes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedRespuestas = [
      { pregunta_id: 1, respuesta: respuestas.criterioClase },
      { pregunta_id: 2, respuesta: respuestas.terminaTiempo },
      { pregunta_id: 3, respuesta: respuestas.llegaTiempo },
      { pregunta_id: 4, respuesta: respuestas.ejemplosClaros },
      { pregunta_id: 5, respuesta: respuestas.objetivosClase },
      { pregunta_id: 6, respuesta: respuestas.retroalimentacion },
      { pregunta_id: 7, respuesta: respuestas.empatia },
      { pregunta_id: 8, respuesta: respuestas.claridadRespuestas },
      { pregunta_id: 9, respuesta: respuestas.metodosEnseñanza },
      { pregunta_id: 10, respuesta: respuestas.participacionEstudiantes }
    ];
  
    try {
      const response = await fetch('http://localhost:3001/guardarRespuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          respuestas: formattedRespuestas,
          id_alumno: 1,  // Cambiar a un valor dinámico si es necesario
          id_profesor: 1 // Cambiar a un valor dinámico si es necesario
        })
      });
  
      const data = await response.json();
      if (data.success) {
        alert('Respuestas enviadas con éxito');
      } else {
        alert('Error al enviar respuestas: ' + data.message);
      }
    } catch (error) {
      console.error('Error al enviar respuestas:', error);
      alert('Error al enviar respuestas');
    }
  };
  

  return (
    <div className="encuesta-container">
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
              <Pregunta 
                pregunta="¿El profesor compartió los criterios de clase?" 
                name="criterioClase" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿El profesor terminaba sus clases a tiempo?" 
                name="terminaTiempo" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿El profesor llegaba a tiempo a sus clases?" 
                name="llegaTiempo" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿Proporciona ejemplos claros y relevantes durante las explicaciones?" 
                name="ejemplosClaros" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿El profesor explica claramente los objetivos de cada clase?" 
                name="objetivosClase" 
                handleChange={handleChange} 
              />
            </div>
            <div className="columna">
              <Pregunta 
                pregunta="¿Ofrece retroalimentación constructiva y oportuna a los estudiantes?" 
                name="retroalimentacion" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿El profesor muestra empatía y respeto hacia los estudiantes?" 
                name="empatia" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿Responde con claridad y precisión a las preguntas de los estudiantes?" 
                name="claridadRespuestas" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿Utiliza métodos de enseñanza que fomenten el pensamiento crítico y el aprendizaje activo?" 
                name="metodosEnseñanza" 
                handleChange={handleChange} 
              />
              <Pregunta 
                pregunta="¿Fomenta la participación de todos los estudiantes en la clase?" 
                name="participacionEstudiantes" 
                handleChange={handleChange} 
              />
            </div>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>
    </div>
  );
}

function Pregunta({ pregunta, name, handleChange }) {
  return (
    <div className="pregunta">
      <p>{pregunta}</p>
      <div className="satisfaccion">
        <label>
          <input type="radio" name={name} value="1" onChange={handleChange} />
          <span role="img" aria-label="Muy insatisfecho">😠</span>
        </label>
        <label>
          <input type="radio" name={name} value="2" onChange={handleChange} />
          <span role="img" aria-label="Insatisfecho">😞</span>
        </label>
        <label>
          <input type="radio" name={name} value="3" onChange={handleChange} />
          <span role="img" aria-label="Neutral">😐</span>
        </label>
        <label>
          <input type="radio" name={name} value="4" onChange={handleChange} />
          <span role="img" aria-label="Satisfecho">🙂</span>
        </label>
        <label>
          <input type="radio" name={name} value="5" onChange={handleChange} />
          <span role="img" aria-label="Muy satisfecho">😃</span>
        </label>
      </div>
    </div>
  );
}

export default EncuestaProfesores;
