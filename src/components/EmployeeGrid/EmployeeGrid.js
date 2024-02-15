import React, { useState } from "react";
import {Row, Col, Dropdown, Button, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TasksGrid from '../TasksGrid/TasksGrid';
import { getDataPerEmployee } from '../../api/data';
const { Title } = Typography;

const scrollY = 300

const columns = [
    {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
        width: 90,
    },
    {
        title: 'Bloq.',
        dataIndex: 'block',
        key: 'block',
        width: 50,
    },
    {
        title: 'Prior.',
        dataIndex: 'priority',
        key: 'priority',
        width: 50,
    },
    {
        title: 'Nº',
        dataIndex: 'company_number',
        key: 'company_number',
        width: 65,
    },
    {
        title: 'Empresa',
        dataIndex: 'company_name',
        key: 'company_name',
        width: 150,

    },
    {
        title: 'XD',
        dataIndex: 'xd',
        key: 'xd',
        width: 40,
    },
    {
        title: 'Sit.',
        dataIndex: 'sit',
        key: 'sit',
        width: 50,
    }, 
    {
        title: 'TE',
        dataIndex: 'te',
        key: 'te',
        width: 100,
    },  
    {
        title: 'TI',
        dataIndex: 'ti',
        key: 'ti',
        width: 100,
    },  
    {
        title: 'TP',
        dataIndex: 'tp',
        key: 'tp',
        width: 100,
        onCell: (record) =>({
            className:  record.tp?.startsWith('-') ? 'red-text' : '' }),
    },    
    {
        title: 'Salida',
        dataIndex: 'exit',
        key: 'exit',
        width: 110,
    }               
];

const items = [
    {
      label: 'Abel',
      key: 'AB',
    },
    {
      label: 'Anabel',
      key: 'AN',
    },
    {
      label: 'Antonio Rodriguez',
      key: 'AR',
    },
    {
      label: 'Bea Menor',
      key: 'BM',
    },
];

const EmployeeGrid = () => {

    const [employee, setEmployee] = useState();
    const [employeeCode, setEmployeeCode] = useState();

    const handleMenuClick = (e) => {
        setEmployee((items.find(item => item.key === e.key)).label)
        setEmployeeCode(e.key)
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
                <Title level={4}>
                    Selecciona el usuario: 
                    <Dropdown menu={menuProps}>
                        <Button>
                            <Space>
                                {employee}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Title>
                <Button>
                    Ver/Editar información del empleado
                </Button>
            </div>
            <Row gutter={[16, 16]}>
                {getDataPerEmployee(employeeCode).map(task_type => <Col span={12}><TasksGrid key={task_type.type} tasks={task_type} columns={columns} scrollY={scrollY}/></Col>)}
            </Row>
        </>
    )
}

export default EmployeeGrid;
