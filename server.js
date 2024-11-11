const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Configurar el servidor Express
const app = express();
const port = 3000;

app.use(cors());

// Habilitar el uso de JSON en el cuerpo de las peticiones
app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos como HTML, CSS y JS

// Crear la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'digitalmindworks'
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a MySQL');
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


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
