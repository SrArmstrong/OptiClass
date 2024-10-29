// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Login_Sign/LoginSignup';
import Materias from './Materias/Materias';
import Grupos from './Grupos/Grupos';
import Profesores from './Profesores/Profesores';
import Horarios from './Horarios/Horarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/profesores" element={<Profesores />} />
        <Route path="/horarios" element={<Horarios />} />
      </Routes>
    </Router>
  );
}

export default App;
