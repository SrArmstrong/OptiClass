// src/Grupos.js

import React, { useState } from 'react';

const Grupos = () => {
  const [grupos, setGrupos] = useState([
    // Datos de ejemplo, en una aplicación real esto vendría del backend
    { id: '1', nombre: 'Grupo A', materias: ['1', '2'], profesores: ['1', '2'] },
    { id: '2', nombre: 'Grupo B', materias: ['3'], profesores: ['3'] }
  ]);

  const [newGrupo, setNewGrupo] = useState({
    nombre: '',
    materias: [],
    profesores: []
  });

  const handleAddGrupo = () => {
    setGrupos([
      ...grupos,
      { id: (grupos.length + 1).toString(), ...newGrupo }
    ]);
    setNewGrupo({ nombre: '', materias: [], profesores: [] });
  };

  return (
    <div>
      <h1>Grupos</h1>
      <ul>
        {grupos.map(grupo => (
          <li key={grupo.id}>
            {grupo.nombre} - Materias: {grupo.materias.join(', ')} - Profesores: {grupo.profesores.join(', ')}
          </li>
        ))}
      </ul>
      <div>
        <h2>Agregar Grupo</h2>
        <input
          type="text"
          placeholder="Nombre del grupo"
          value={newGrupo.nombre}
          onChange={(e) => setNewGrupo({ ...newGrupo, nombre: e.target.value })}
        />
        <button onClick={handleAddGrupo}>Agregar</button>
      </div>
    </div>
  );
};

export default Grupos;
