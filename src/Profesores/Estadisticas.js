import React, { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
//import './Estadistica.css';

const { Title, Text } = Typography;

const Estadisticas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correo, tipo } = location.state || {};
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/estadistica')
      .then((response) => {
        setProfesores(response.data.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  return (
    <div className="estadisticas-container">
      <aside className="sidebar">
        <h2>Menú</h2>
        <ul>
          <li>Encuesta de profesores</li>
          <li>Horarios</li>
        </ul>
      </aside>

      <div className="content">
        <div className="titulo-container">
          <Title level={2}>Estadísticas de Evaluación Docente</Title>
          <Text>Resumen de tus evaluaciones</Text>
        </div>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {profesores.map((profesor, index) => {
            const promedio = profesor.promedio_puntuacion
              ? parseFloat(profesor.promedio_puntuacion).toFixed(2)
              : 0;

            // Datos dinámicos para el gráfico (rango 0 a 10)
            const data = [
              { name: 'Calificación', value: parseFloat(promedio) },
              { name: 'Restante', value: 10 - parseFloat(promedio) },
            ];

            // Colores: verde para el promedio, rojo para el restante
            const colors = ['#2fe815', '#e81515'];

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <div className="profesor-card">
                  <Text strong style={{ fontSize: '14px' }}>
                    {profesor.nombre} {profesor.appaterno} {profesor.apmaterno}
                  </Text>
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                      >
                        {data.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={colors[idx]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Text
                    style={{
                      fontSize: '12px',
                      display: 'block',
                      textAlign: 'center',
                      color: '#555',
                    }}
                  >
                    Promedio: {promedio ? promedio : 'No disponible'} / 10
                  </Text>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Estadisticas;
