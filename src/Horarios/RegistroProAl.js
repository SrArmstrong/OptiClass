// src/RegistrarAlumno.js
import React, { useState } from 'react';
import axios from 'axios';
import './Horarios.css'; // Mantiene los estilos de la sidebar

const RegistrarAlumno = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contrasenia: '',
    nombre: '',
    appaterno: '',
    apmaterno: '',
    grupo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos al servidor para registrar el alumno
      const response = await axios.post('http://localhost:3001/register/alumno', formData);
      console.log(response.data); // Muestra la respuesta de la solicitud
      alert("Alumno registrado correctamente");
      setFormData({
        correo: '',
        contrasenia: '',
        nombre: '',
        appaterno: '',
        apmaterno: '',
        grupo: ''
      }); // Limpiar el formulario después del envío
    } catch (error) {
      console.error('Error al enviar los datos', error);
      alert("Hubo un error al registrar al alumno");
    }
  };

  return (
    <div className="horarios-container">
      <aside className="sidebar">
        <h2><b>Menú</b></h2>
        <ul>
          <li><b>Dar de alta Profesores/Alumnos</b></li>
          <li>Generar Horarios</li>
          <li>Administrar Información de la Escuela</li>
        </ul>
      </aside>

      <div className="form-content">
        <h3>Registrar Alumno</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido Paterno:</label>
            <input
              type="text"
              name="appaterno"
              value={formData.appaterno}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido Materno:</label>
            <input
              type="text"
              name="apmaterno"
              value={formData.apmaterno}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Grupo:</label>
            <input
              type="text"
              name="grupo"
              value={formData.grupo}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Registrar Alumno</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarAlumno;
