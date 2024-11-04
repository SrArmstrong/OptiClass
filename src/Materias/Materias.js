// src/Materias.js

import React, { useState } from 'react';

const Materias = () => {
  const [materias, setMaterias] = useState([
    // Datos de ejemplo, en una aplicación real esto vendría del backend
    { id: '1', nombre: 'Matemáticas', duracion: 50, grupos: ['1'], profesores: ['1'] },
    { id: '2', nombre: 'Historia', duracion: 50, grupos: ['1'], profesores: ['2'] }
  ]);

  const [newMateria, setNewMateria] = useState({
    nombre: '',
    duracion: 50,
    grupos: [],
    profesores: []
  });

  const handleAddMateria = () => {
    setMaterias([
      ...materias,
      { id: (materias.length + 1).toString(), ...newMateria }
    ]);
    setNewMateria({ nombre: '', duracion: 50, grupos: [], profesores: [] });
  };

  return (
    <div>
      <h1>Materias</h1>
      <ul>
        {materias.map(materia => (
          <li key={materia.id}>
            {materia.nombre} - Duración: {materia.duracion} minutos
          </li>
        ))}
      </ul>
      <div>
        <h2>Agregar Materia</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newMateria.nombre}
          onChange={(e) => setNewMateria({ ...newMateria, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duración"
          value={newMateria.duracion}
          onChange={(e) => setNewMateria({ ...newMateria, duracion: Number(e.target.value) })}
        />
        <button onClick={handleAddMateria}>Agregar</button>
      </div>
    </div>
  );
};

export default Materias;
