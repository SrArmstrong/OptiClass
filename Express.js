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
  //password: 'root',
  password: '',
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

app.post('/register/profesor', (req, res) => {
  const { correo, contrasenia, nombre, appaterno, apmaterno } = req.body; // No es necesario incluir 'grupo' ni 'rol' aquí, ya que es un endpoint solo para profesores

  // Verificar que todos los campos necesarios estén presentes
  if (!correo || !contrasenia || !nombre || !appaterno || !apmaterno) {
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

    // Insertar nuevo usuario como 'Profesor'
    const query = 'INSERT INTO usuarios (correo, contrasenia, tipo) VALUES (?, ?, ?)';
    db.query(query, [correo, hashedPassword, 2], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
      }

      const newUserId = result.insertId;

      // Insertar en la tabla 'profesores'
      const insertProfesorQuery = 'INSERT INTO profesores (nombre, appaterno, apmaterno, id_usuario, dias_trabajo, horainicio_trabajo, horafin_trabajo) VALUES (?, ?, ?, ?, NULL, NULL, NULL)';
      db.query(insertProfesorQuery, [nombre, appaterno, apmaterno, newUserId], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
        }

        res.status(201).json({ success: true, message: 'Profesor registrado con éxito' });
      });
    });
  });
});

app.post('/register/alumno', (req, res) => {
  const { correo, contrasenia, nombre, appaterno, apmaterno, grupo } = req.body;

  if (!correo || !contrasenia || !nombre || !appaterno || !apmaterno || !grupo) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  const checkQuery = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(checkQuery, [correo], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
    }

    const hashedPassword = md5(contrasenia);
    const query = 'INSERT INTO usuarios (correo, contrasenia, tipo) VALUES (?, ?, ?)';

    db.query(query, [correo, hashedPassword, 3], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
      }

      const newUserId = result.insertId;

      // Recuperar el id_grupo basado en el nombre del grupo
      const getGrupoIdQuery = 'SELECT id_grupo FROM grupos WHERE nombre = ?';
      db.query(getGrupoIdQuery, [grupo], (err, grupoResult) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error al recuperar el ID del grupo', error: err });
        }

        if (grupoResult.length === 0) {
          return res.status(404).json({ success: false, message: 'Grupo no encontrado' });
        }

        const idGrupo = grupoResult[0].id_grupo;

        // Insertar en la tabla 'alumnos' con el id_grupo recuperado
        const insertAlumnoQuery = 'INSERT INTO alumnos (nombre, appaterno, apmaterno, grupo, id_grupo, id_usuario) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertAlumnoQuery, [nombre, appaterno, apmaterno, grupo, idGrupo, newUserId], (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
          }

          res.status(201).json({ success: true, message: 'Alumno registrado con éxito' });
        });
      });
    });
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
      db.query(query1, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(query2, (err, results) => {
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

// Ruta para obtener los grupos desde la base de datos
app.get('/datosPhorarios', (req, res) => {
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
      db.query(query1, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(query2, (err, results) => {
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

app.post('/guardarRespuestas', (req, res) => {
  const { respuestas } = req.body;
  const id_alumno = 1; // Por ahora, se asigna un valor estático
  const id_profesor = 4; // Por ahora, se asigna un valor estático
  const fecha_respuesta = new Date(); // Genera la fecha y hora actual

  // Crear una consulta SQL para insertar cada respuesta
  const queries = respuestas.map(({ pregunta_id, respuesta }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO formulario (id_alumno, id_profesor, pregunta_id, respuesta, fecha_respuesta)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(query, [id_alumno, id_profesor, pregunta_id, respuesta, fecha_respuesta], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });

  // Ejecutar todas las consultas en paralelo
  Promise.all(queries)
    .then((results) => {
      res.status(201).json({ success: true, message: 'Respuestas guardadas con éxito' });
    })
    .catch((error) => {
      console.error('Error detallado de MySQL:', error);
      res.status(500).json({ success: false, message: 'Error al guardar respuestas', error: error.message });
    });
});

// Nueva ruta para mostrar estadística de profesores
app.get('/estadisticas', (req, res) => {
  const query = `
    SELECT 
      p.id_profesor, 
      p.nombre, 
      p.appaterno, 
      p.apmaterno, 
      COALESCE(AVG(f.respuesta), 0) AS promedio_puntuacion
    FROM profesores p
    LEFT JOIN formulario f ON p.id_profesor = f.id_profesor
    GROUP BY p.id_profesor
    ORDER BY promedio_puntuacion DESC;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ success: false, message: 'Error en el servidor', error: err });
    }

    // Enviar el resultado como respuesta JSON
    res.status(200).json({
      success: true,
      data: result
    });
  });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
