import React from 'react';
import { Table, Select,Button, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;
const { Option } = Select;

const scheduleData = [
  { time: '5:00 PM - 6:00 PM', lunes: 'CLASE1', martes: 'CLASE1', miercoles: 'CLASE1', jueves: 'CLASE1', viernes: 'CLASE1' },
  { time: '6:00 PM - 7:00 PM', lunes: 'CLASE2', martes: 'CLASE2', miercoles: 'CLASE2', jueves: 'CLASE2', viernes: 'CLASE2' },
  { time: '7:00 PM - 8:00 PM', lunes: 'CLASE3', martes: 'CLASE3', miercoles: 'CLASE3', jueves: 'CLASE3', viernes: 'CLASE3' },
  { time: '8:00 PM - 9:00 PM', lunes: 'CLASE4', martes: 'CLASE4', miercoles: 'CLASE4', jueves: 'CLASE4', viernes: 'CLASE4' },
  { time: '9:00 PM - 10:00 PM', lunes: 'CLASE5', martes: 'CLASE5', miercoles: 'CLASE5', jueves: 'CLASE5', viernes: 'CLASE5' },
];

const columns = [
  { title: '', dataIndex: 'time', key: 'time' },
  { title: 'Lunes', dataIndex: 'lunes', key: 'lunes' },
  { title: 'Martes', dataIndex: 'martes', key: 'martes' },
  { title: 'Miércoles', dataIndex: 'miercoles', key: 'miercoles' },
  { title: 'Jueves', dataIndex: 'jueves', key: 'jueves' },
  { title: 'Viernes', dataIndex: 'viernes', key: 'viernes' },
];

const Horarios = () => {
  return (
    <div>
      <Title level={2}>Horarios disponibles:</Title>
      <Text>Consulta tus horarios por grupo asignado.</Text>
      <Select defaultValue="IDGS11" style={{ width: 120, margin: '20px 0' }}>
        <Option value="IDGS11">IDGS11</Option>
        <Option value="IDGS12">IDGS12</Option>
      </Select>

      <Table 
        columns={columns} 
        dataSource={scheduleData} 
        rowKey="time" 
        pagination={false} 
        bordered 
        style={{ marginTop: '20px' }}
      />
                <Button
            type="link"
            icon={<DownloadOutlined />}
            style={{ marginTop: '20px', fontWeight: 'bold' }}
          >
            Descargar Horario en PDF
          </Button>
    </div>
    
    
  );
};

export default Horarios;
