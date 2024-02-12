import React, { useState } from "react";
import {Row, Col, Dropdown, Button, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TasksPerEmployee from '../EmployeeTasks/EmployeeTasks';
import { getDataPerEmployee } from '../../api/data';
const { Title } = Typography;

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
                {getDataPerEmployee(employeeCode).map(task_type => <Col span={12}><TasksPerEmployee key={task_type.type} {...task_type}/></Col>)}
            </Row>
        </>
    )
}

export default EmployeeGrid;
