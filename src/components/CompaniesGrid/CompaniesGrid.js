import React, { useState } from "react";
import {Dropdown, Button, Space, Typography, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TasksGrid from '../TasksGrid/TasksGrid';
import { getDataPerCompany } from '../../api/data';
const { Title } = Typography;

const scrollY = 125
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
    {   title: 'Con.',
        dataIndex: 'con',
        key: 'con',
        width: 30,
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
      label: 'SOCIEDAD 162 S.L.',
      key: 162,
    },
    {
      label: 'SOCIEDAD 169 S.L.',
      key: 169,
    },
    {
      label: 'SOCIEDAD 214 S.L.',
      key: 214,
    },
    {
      label: 'SOCIEDAD 275 S.L.',
      key: 275,
    },
];

const CompanyGrid = () => {

    const [company, setCompany] = useState();
    const [companyCode, setCompanyCode] = useState();

    const handleMenuClick = (e) => {
        setCompany((items.find(item => item.key === Number(e.key))).label)
        setCompanyCode(Number(e.key))
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
                <Title level={4}>
                    Selecciona la empresa: 
                    <Dropdown menu={menuProps}>
                        <Button>
                            <Space>
                                {company}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </Title>
                <Button>
                    Ver/Editar información de la empresa
                </Button>
            </div>
            <Row gutter={[16,16]}>
                {getDataPerCompany(companyCode).map(task_type => <Col span={24}><TasksGrid key={task_type.type} tasks={task_type} columns={columns} scrollY={scrollY}/></Col>)}
            </Row>
        </>
    )
}

export default CompanyGrid;
