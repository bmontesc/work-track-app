import * as React from 'react';
import { Layout, Menu, theme, Avatar } from 'antd';

const { Header} = Layout;

const items = [{key: 1, label: 'Plan'}, {key: 2, label: 'Lista Empresas'}, {key: 3, label: 'Mis tareas'}];


const AppHeader = () => {

  const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();

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
        }}
      >
        <Avatar shape="square" style={{marginRight: '20px'}} size={48} src="https://media.licdn.com/dms/image/C4E0BAQGqrz5hxLCRzA/company-logo_200_200/0/1655462109913/btasesores_logo?e=2147483647&v=beta&t=dM707dYicMONt_rUFKSzzGtBxWXoas0CDm2R40D84r8" />
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
