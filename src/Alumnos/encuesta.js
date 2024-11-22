import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './encuesta.css';

function EncuestaProfesores() {
  const location = useLocation();
  const { correo, tipo } = location.state || {}; 

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

  const [idAlumno, setIdAlumno] = useState(null); // Estado para almacenar el ID del alumno
  const [informes, setInformes] = useState([]);  // Estado para almacenar los informes
  const [idSeleccionado, setIdSeleccionado] = useState('');  // Estado para el id seleccionado
  const [loading, setLoading] = useState(true);

    const idAlumnoRef = useRef(null); // Define una referencia mutable

    // Recuperar el ID del alumno al cargar la página
    useEffect(() => {
      const obtenerIdAlumno = async () => {
        try {
          const response = await fetch('http://localhost:3001/idusuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo })
          });
      
          if (!response.ok) {
            // Si la respuesta no es exitosa, mostramos el mensaje de error
            throw new Error('Error al obtener el ID del alumno. Estado de la respuesta no es OK.');
          }
      
          const idAlumno = await response.json(); // El ID se obtiene directamente
      
          if (idAlumno) {
            setIdAlumno(idAlumno); // Guarda el ID del alumno en el estado
            console.log(idAlumno);
          } else {
            console.error('No se encontró el ID del alumno.');
          }
        } catch (error) {
          console.error('Error al obtener el ID del alumno:', error);
        }
      };
      
      if (correo) {
        obtenerIdAlumno();
      }
      
      console.log('IDIDID', idAlumno);

    }, [correo]);  

    useEffect(() => {
      const obtenerInformes = async () => {
        try {
          const response = await fetch('http://localhost:3001/profesores');
          
          if (!response.ok) {
            throw new Error('Error al obtener los informes.');
          }
  
          const data = await response.json(); // Obtener los datos de la respuesta
  
          if (data.success && data.data) {
            setInformes(data.data);  // Guardar los datos de los informes en el estado
          } else {
            console.error('No se encontraron informes.');
          }
        } catch (error) {
          console.error('Error al obtener los informes:', error);
        } finally {
          setLoading(false);  // Deja de cargar
        }
      };
  
      obtenerInformes();
    }, []); 

      // Manejar el cambio del select
      const handleSelectChange = (e) => {
        const idProfesor = e.target.value;  // El valor será el id_profesor
        setIdSeleccionado(idProfesor);      // Actualiza el estado con el id_profesor
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('ID Alumno:', idAlumno);
    console.log('ID Profesor Seleccionado:', idSeleccionado);
  
    if (!idAlumno) {
      alert('No se pudo recuperar el ID del alumno.');
      return;
    }
  
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
          id_alumno: idAlumno,
          id_profesor: parseInt(idSeleccionado)  // Asegúrate de que sea un número
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
        <h1>Menú</h1>
        <ul>
          <li>Encuesta de profesores</li>
          <li>Horarios</li>
          <li>
            <p><strong>Correo:</strong> {correo}</p>
          </li>
          <li>
            <p><strong>Tipo de Usuario:</strong> {tipo}</p>
          </li>
        </ul>
      </aside>

      <div className="content">
        <h1 className='title'>Encuesta de Profesores</h1>
        <form onSubmit={handleSubmit}>

            <select value={idSeleccionado} onChange={handleSelectChange}>
              <option value="">Seleccione un Profesor</option>
              
              {informes.map((informe) => (
                <option key={informe.id_profesor} value={informe.id_profesor}>
                  {informe.nombre_completo || `${informe.nombre} ${informe.appaterno} ${informe.apmaterno}`}
                </option>
              ))}
            </select>

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
