import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;

const data = [
  { name: 'Positivo', value: 80, color: '#82ca9d' },
  { name: 'Negativo', value: 20, color: '#ff6f61' },
];

const Estadisticas = () => {
  return (
    <div style={{ marginLeft: '240px', padding: '20px' }}> {/* Ajusta el margen izquierdo */}
      
      {/* navbar */}
      <aside className="sidebar">
        <h2>Menú</h2>
        <ul>
          <li>Encuesta de profesores</li>
          <li>Horarios</li>
        </ul>
      </aside>
  
      <Title level={2}>Estadísticas de Evaluación Docente</Title>
      <Text>Resumen de tus evaluaciones</Text>
  
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {[...Array(5)].map((_, index) => (
          <Col xs={24} sm={12} md={8} lg={8} key={index}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        ))}
      </Row>
  
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Text strong style={{ fontSize: '16px' }}>
          Calificación Promedio del Profesor: <span style={{ fontWeight: 'bold' }}>80.0%</span>
        </Text>
        <Button type="primary" style={{ backgroundColor: '#ffa500', borderColor: '#ffa500', marginLeft: '10px' }}>
          Prioridad Media
        </Button>
      </div>
    </div>
  );
  
};

export default Estadisticas;
