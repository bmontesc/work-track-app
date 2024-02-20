import React, { useEffect } from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {useUser} from '../../utils/useUser';

const { Header} = Layout;

function getItem(label, key) {
  return { key, label };
}

const items = [
  getItem((<Link to={'/home'}>Plan Global</Link>), 1),
  getItem((<Link to={'/employees'}>Tareas por trabajador</Link>), 2),
  getItem((<Link to={'/companies'}>Tareas por empresa</Link>), 3)
];

const AppHeader = () => {

  const {isLogged, logOutAuth} = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logOutAuth()
  };

  useEffect(()=>{
    if (!isLogged) navigate("/")
  },[isLogged])

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
          src="https://media.licdn.com/dms/image/C4E0BAQGqrz5hxLCRzA/company-logo_200_200/0/1655462109913/btasesores_logo?e=2147483647&v=beta&t=dM707dYicMONt_rUFKSzzGtBxWXoas0CDm2R40D84r8" 
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
      <Button onClick={handleLogout}>
          Cerrar sesión
      </Button>
      </Header>
    </Layout>
  );
};
export default AppHeader;
