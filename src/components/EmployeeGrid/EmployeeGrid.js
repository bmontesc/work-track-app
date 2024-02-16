import React, { useState, useEffect } from "react";
import {Row, Col, Dropdown, Button, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TasksGrid from '../TasksGrid/TasksGrid';
import { getAccountantList, getTasksPerAccId } from '../../api/getData';
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

// const items = [
//     {
//       label: 'SOCIEDAD 162 S.L.',
//       key: 162,
//     },
//     {
//       label: 'SOCIEDAD 169 S.L.',
//       key: 169,
//     },
//     {
//       label: 'SOCIEDAD 214 S.L.',
//       key: 214,
//     },
//     {
//       label: 'SOCIEDAD 275 S.L.',
//       key: 275,
//     },
// ];

const EmployeeGrid = () => {

    const [items, setItems] = useState([]);
    const [employee, setEmployee] = useState();
    const [employeeCode, setEmployeeCode] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
 
    const handleMenuClick = (e) => {
        console.log(e.target)
        setEmployee((items.find(item => item.key === e.key)).label)
        setEmployeeCode(e.key)
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const fetchData = async () => {
        if (items.length === 0) {
            try { 
                const data = await getAccountantList();
                const menuItems = data.map(element => ({key:element.id, label:element.name }));
                console.log(menuItems)
                setItems(menuItems)
                setDataLoaded(true)
            } catch (error) {
                console.error('Error la lista de contables', error);
            } 
        }
    };

    useEffect(()=>{
        fetchData()
    },[]);


    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    console.log(menuProps)
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

            
        </>
    )
}

export default EmployeeGrid;


/* 
<Row gutter={[16, 16]}>
                {getTasksPerAccId(employeeCode).map(task_type => <Col span={12}><TasksGrid key={task_type.type} tasks={task_type} columns={columns} scrollY={scrollY}/></Col>)}
            </Row>
*/
