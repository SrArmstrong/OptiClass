// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Login_Sign/LoginSignup';
import Materias from './Materias/Materias';
import Grupos from './Grupos/Grupos';
import Profesores from './Profesores/Profesores';
import Estadisticas from './Profesores/Estadisticas';
import Horarios from './Horarios/Horarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/profesores" element={<Profesores />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/horarios" element={<Horarios />} />
      </Routes>
    </Router>
  );
}

export default App;

/*
// src/App.js

import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import LoginSignup from './Login_Sign/LoginSignup';
import Materias from './Materias/Materias';
import Grupos from './Grupos/Grupos';
import Profesores from './Profesores/Profesores';
import Horarios from './Horarios/Horarios';
import Estadisticas from './Profesores/Estadisticas';
import './App.css';

const { Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' ? (
        <Layout style={{ height: '100vh' }}>
          <Sider width={200} className="sidebar">
            <Title level={4} style={{ color: 'white', padding: '10px' }}>OptiClass</Title>
            <Menu mode="vertical" defaultSelectedKeys={['horarios']}>
              <Menu.Item key="materias">
                <Link to="/materias">Materias</Link>
              </Menu.Item>
              <Menu.Item key="grupos">
                <Link to="/grupos">Grupos</Link>
              </Menu.Item>
              <Menu.Item key="profesores">
                <Link to="/profesores">Profesores</Link>
              </Menu.Item>
              <Menu.Item key="horarios">
                <Link to="/horarios">Horarios</Link>
              </Menu.Item>
              <Menu.Item key="estadisticas">
                <Link to="/estadisticas">Estadísticas de Encuestas</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '20px' }}>
            <Content>
              <Routes>
                <Route path="/materias" element={<Materias />} />
                <Route path="/grupos" element={<Grupos />} />
                <Route path="/profesores" element={<Profesores />} />
                <Route path="/horarios" element={<Horarios />} />
                <Route path="/estadisticas" element={<Estadisticas />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<LoginSignup />} />
        </Routes>
      )}
    </>
  );
};

export default App;
*/