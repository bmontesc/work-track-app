import * as React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
const { Header} = Layout;

function getItem(label, key) {
  return { key, label };
}

const items = [
  getItem((<Link to={'/'}>Plan Global</Link>), 1),
  getItem((<Link to={'/employees'}>Tareas por trabajador</Link>), 2),
  getItem((<Link to={'/companies'}>Tareas por empresa</Link>), 3)
];

const AppHeader = () => {

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
        <Avatar 
          shape="square" 
          style={{marginRight: '20px'}} 
          size={48} 
          src="..\..\public\btasesores_logo.png" 
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
    </Layout>
  );
};
export default AppHeader;
