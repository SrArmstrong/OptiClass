const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const md5 = require('md5');

const app = express();
const port = 3001;

// Middleware para manejar JSON
app.use(bodyParser.json());
app.use(cors()); // Habilitar CORS

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'digitalmindworks'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});



// Ruta para manejar la autenticación de inicio de sesión
app.post('/login', (req, res) => {
  const { correo, contrasenia } = req.body;

  const contraseniamd5 = md5(contrasenia);

  const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ?';
  db.query(query, [correo, contraseniamd5], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error in the server', error: err });
    }

    if (result.length > 0) {
      // Si el usuario es válido
      // Envía todos los datos del usuario
      res.json({ success: true, message: 'Login successful', userData: result[0] }); // Devolvemos el primer usuario encontrado
    } else {
      // Si las credenciales no coinciden
      res.json({ success: false, message: 'Invalid correo or contrasenia' });
    }
  });
});



app.post('/register', (req, res) => {
  const { correo, contrasenia, nombre, appaterno, apmaterno, grupo, rol } = req.body; // Capturar el campo 'rol'

  // Verificar que todos los campos necesarios estén presentes
  if (!correo || !contrasenia || !nombre || !appaterno || !apmaterno || !rol) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el correo ya está registrado
  const checkQuery = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(checkQuery, [correo], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
    }

    if (result.length > 0) {
      // Si el correo ya está registrado
      return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
    }

    // Hash de la contraseña antes de guardarla
    const hashedPassword = md5(contrasenia);

    // Insertar nuevo usuario con el campo 'rol'
    if (rol === "Profesor") {

      var query = 'INSERT INTO usuarios (correo, contrasenia, tipo) VALUES (?, ?, ?)';
      db.query(query, [correo, hashedPassword, 2], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
        }

        const newUserId = result.insertId;        

        query = 'INSERT INTO profesores (nombre, appaterno, apmaterno, id_usuario, dias_trabajo, horainicio_trabajo, horafin_trabajo) VALUES (?, ?, ?, ?, NULL, NULL, NULL)';
        db.query(query, [nombre, appaterno, apmaterno, newUserId], (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
          }

          res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
        });
      });

    } else if (rol === "Alumno"){

      query = 'INSERT INTO usuarios (correo, contrasenia, tipo) VALUES (?, ?, ?)';
      db.query(query, [correo, hashedPassword, 3], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
        }

        const newUserId = result.insertId;        

        query = 'INSERT INTO alumnos (nombre, appaterno, apmaterno, grupo, id_grupo, id_usuario) VALUES (?, ?, ?, NULL, NULL, NULL)';
        db.query(query, [nombre, appaterno, apmaterno, newUserId], (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
          }

          res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
        });
      });

    }

  });
});

// Ruta para obtener los grupos desde la base de datos
app.get('/datos', (req, res) => {
  const query1 = `
    SELECT 
      a.nombre AS asignatura, 
      e.nombre AS edificio, 
      au.nombre AS aula, 
      p.nombre AS profesor, 
      p.appaterno, 
      p.apmaterno, 
      p.dias_trabajo, 
      p.horainicio_trabajo, 
      p.horafin_trabajo, 
      p.calificación 
    FROM 
      asignaturas a 
    LEFT JOIN 
      profesores p ON CONVERT(a.nombre USING utf8mb4) = CONVERT(p.asignatura USING utf8mb4) 
    LEFT JOIN 
      aulas au ON p.id_profesor = au.id_aula 
    LEFT JOIN 
      edificios e ON au.id_edificio = e.id_edificio
  `;

  const query2 = `SELECT * FROM grupos`;

  Promise.all([
    new Promise((resolve, reject) => {
      connection.query(query1, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      connection.query(query2, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    })
  ])
  .then(([results1, results2]) => {
    res.json({ Profesores: results1, Grupos: results2 });
  })
  .catch(err => {
    res.status(500).send('Error en la consulta');
  });
});


// Ruta para mostrar usuarios
app.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error in the server', error: err });
    }

    // Envía la respuesta con los resultados formateados
    res.status(200).json({
      success: true,   // Indica que la operación fue exitosa
      data: result     // Los datos de la tabla `usuarios`
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
