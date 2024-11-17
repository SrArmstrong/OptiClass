import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Asegúrate de tener los estilos

const LoginSignup = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [rol, setRol] = useState(''); // Estado para manejar el rol (Alumno o Profesor)
  const [nombre, setNombre] = useState('');
  const [appaterno, setAppaterno] = useState('');
  const [apmaterno, setApmaterno] = useState('');
  const [grupo, setGrupo] = useState(''); // Solo se mostrará si es Alumno
  const navigate = useNavigate();

  
  const handleSignIn = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo: correo, contrasenia: contrasenia })
      });
  
      const data = await response.json();
      
      if (data.success) {
        // Acceder a los datos del usuario
        const userData = data.userData;
        console.log('Datos del usuario:', userData);
  
        // Redirigir según el tipo de usuario
        switch (userData.tipo) {
          case "1":
            navigate('/Horarios', { state: { correo: userData.correo, tipo: userData.tipo } });
            break;
          case "2":
            navigate('/Profesores', { state: { correo: userData.correo, tipo: userData.tipo } });
            break; 
          case "3":
            navigate('/Alumnos', { state: { correo: userData.correo, tipo: userData.tipo } });
            break;
          default:
            alert('Tipo de usuario no reconocido');
            break;
        }
      } else {
        alert(data.message); // Mostrar mensaje de error
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un objeto con los datos del formulario
    const formData = {
      correo,
      contrasenia,
      rol,
      nombre,
      appaterno,
      apmaterno,
      grupo: rol === 'Alumno' ? grupo : null // Solo envía el grupo si es Alumno
    };

    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      
      if (response.data.success) {
        alert('Usuario registrado con éxito');
        // Reinicia los campos del formulario si es necesario
        setCorreo('');
        setContrasenia('');
        setNombre('');
        setAppaterno('');
        setApmaterno('');
        setGrupo('');
        setRol('');
        setRightPanelActive(false); // Opcional: volver a la vista de inicio de sesión
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Hubo un problema con el registro');
      console.error('Error durante el registro:', error);
    }
  };

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  // Función para manejar la selección de Alumno o Profesor
  const handleRoleChange = (e) => {
    setRol(e.target.value); // Actualiza el rol (Alumno o Profesor)
  };

  return (
    <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Registrarse</h1>
          <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
          
          {/* Checkbox para seleccionar Alumno o Profesor */}
          <div>
            <label>
              <input
                type="radio"
                value="Alumno"
                checked={rol === 'Alumno'}
                onChange={handleRoleChange}
              /> Alumno
            </label>
            <label>
              <input
                type="radio"
                value="Profesor"
                checked={rol === 'Profesor'}
                onChange={handleRoleChange}
              /> Profesor
            </label>
          </div>

          {/* Inputs adicionales según el rol seleccionado */}
          {rol && (
            <div>
              <input 
                type="text" 
                placeholder="Nombre" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Apellido Paterno" 
                value={appaterno} 
                onChange={(e) => setAppaterno(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Apellido Materno" 
                value={apmaterno} 
                onChange={(e) => setApmaterno(e.target.value)} 
              />

              {/* Si el rol es Alumno, muestra el campo de grupo */}
              {rol === 'Alumno' && (
                <input 
                  type="text" 
                  placeholder="Grupo" 
                  value={grupo} 
                  onChange={(e) => setGrupo(e.target.value)} 
                />
              )}
            </div>
          )}

          <button type='submit'>Registrarse</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form action="#">
          <h1>Iniciar sesión</h1>
          <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
          <button onClick={handleSignIn}>Iniciar</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Bienvenido</h1>
            <p>Ingresa tus datos para acceder a los horarios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
