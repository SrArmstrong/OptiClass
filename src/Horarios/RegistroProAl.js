import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Horarios.css';

const RegistrarProAl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correo, tipo } = location.state || {};

  // Estados separados para Alumno y Profesor
  const [formDataAlumno, setFormDataAlumno] = useState({
    correo: '',
    contrasenia: '',
    nombre: '',
    appaterno: '',
    apmaterno: '',
    grupo: '',
  });

  const [formDataProfesor, setFormDataProfesor] = useState({
    correo: '',
    contrasenia: '',
    nombre: '',
    appaterno: '',
    apmaterno: '',
    grupo: '',
  });

  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datos'); // Cambia la URL si es necesario
        setGrupos(response.data.Grupos);
      } catch (error) {
        console.error('Error al obtener los grupos', error);
      }
    };
    fetchGrupos();
  }, []);

  const handleChangeAlumno = (e) => {
    const { name, value } = e.target;
    setFormDataAlumno({
      ...formDataAlumno,
      [name]: value,
    });
  };

  const handleChangeProfesor = (e) => {
    const { name, value } = e.target;
    setFormDataProfesor({
      ...formDataProfesor,
      [name]: value,
    });
  };

  const handleSubmitAlumno = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register/alumno', formDataAlumno);
      console.log(response.data);
      alert('Alumno registrado correctamente');
      setFormDataAlumno({
        correo: '',
        contrasenia: '',
        nombre: '',
        appaterno: '',
        apmaterno: '',
        grupo: '',
      });
    } catch (error) {
      console.error('Error al registrar al alumno', error);
      alert('Hubo un error al registrar al alumno');
    }
  };

  const handleSubmitProfesor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register/profesor', formDataProfesor);
      console.log(response.data);
      alert('Profesor registrado correctamente');
      setFormDataProfesor({
        correo: '',
        contrasenia: '',
        nombre: '',
        appaterno: '',
        apmaterno: '',
        grupo: '',
      });
    } catch (error) {
      console.error('Error al registrar al profesor', error);
      alert('Hubo un error al registrar al profesor');
    }
  };

  return (
    <div className="horarios-container">
      <aside className="sidebar">
        <h2><b>Menú</b></h2>
        <ul>
          <li><a onClick={() => navigate('/horarios')}>Generar Horarios</a></li>
          <li><a onClick={() => navigate('/registroproal')}><b>Dar de alta Profesores/Alumnos</b></a></li>
          <li><a onClick={() => navigate('/restricciones')}>Restricciones de la escuela</a></li>
          <li>Administrar Información de la Escuela</li>
        </ul>
      </aside>

      <div className="row">
        <div className="form-content">
          <h1 style={{ textAlign: 'center' }}>Registrar Alumno</h1>
          <form onSubmit={handleSubmitAlumno}>
            <div>
              <label>Correo:</label>
              <input
                type="email"
                name="correo"
                value={formDataAlumno.correo}
                onChange={handleChangeAlumno}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                name="contrasenia"
                value={formDataAlumno.contrasenia}
                onChange={handleChangeAlumno}
                required
              />
            </div>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formDataAlumno.nombre}
                onChange={handleChangeAlumno}
                required
              />
            </div>
            <div>
              <label>Apellido Paterno:</label>
              <input
                type="text"
                name="appaterno"
                value={formDataAlumno.appaterno}
                onChange={handleChangeAlumno}
                required
              />
            </div>
            <div>
              <label>Apellido Materno:</label>
              <input
                type="text"
                name="apmaterno"
                value={formDataAlumno.apmaterno}
                onChange={handleChangeAlumno}
                required
              />
            </div>
            <div>
              <label>Grupo:</label>
              <select
                name="grupo"
                value={formDataAlumno.grupo}
                onChange={handleChangeAlumno}
                required
              >
                <option value="">Selecciona un grupo</option>
                {grupos.map((grupo) => (
                  <option key={grupo.id_grupo} value={grupo.nombre}>
                    {grupo.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Registrar Alumno</button>
          </form>
        </div>

        <div className="form-content">
          <h1 style={{ textAlign: 'center' }}>Registrar Profesor</h1>
          <form onSubmit={handleSubmitProfesor}>
            <div>
              <label>Correo:</label>
              <input
                type="email"
                name="correo"
                value={formDataProfesor.correo}
                onChange={handleChangeProfesor}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                name="contrasenia"
                value={formDataProfesor.contrasenia}
                onChange={handleChangeProfesor}
                required
              />
            </div>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formDataProfesor.nombre}
                onChange={handleChangeProfesor}
                required
              />
            </div>
            <div>
              <label>Apellido Paterno:</label>
              <input
                type="text"
                name="appaterno"
                value={formDataProfesor.appaterno}
                onChange={handleChangeProfesor}
                required
              />
            </div>
            <div>
              <label>Apellido Materno:</label>
              <input
                type="text"
                name="apmaterno"
                value={formDataProfesor.apmaterno}
                onChange={handleChangeProfesor}
                required
              />
            </div>
            <button type="submit">Registrar Profesor</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarProAl;
