// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Login_Sign/LoginSignup';
import Profesores from './Profesores/Profesores';
import Estadisticas from './Profesores/Estadisticas';
import Horarios from './Horarios/Horarios';
import Alumnos from './Alumnos/encuesta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/profesores" element={<Profesores />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
      </Routes>
    </Router>
  );
}

export default App;