import React, { useState, useEffect } from "react";
import {Row, Col, Dropdown, Button, Space, Typography } from 'antd';
import AppHeader from '../Header/Header';
import { DownOutlined } from '@ant-design/icons';
import TasksGrid from '../TasksGrid/TasksGrid';
import { Link } from "react-router-dom";
import { getAccountantList, getTasksPerAccId } from '../../api/getData';
import generatePDF from "../PDFReport/PDFReport";

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
        dataIndex: 'status',
        key: 'status',
        width: 50,
    }, 
    {
        title: 'TE',
        dataIndex: 'estimated_time',
        key: 'estimated_time',
        width: 100,
    },  
    {
        title: 'TI',
        dataIndex: 'used_time',
        key: 'used_time',
        width: 100,
    },  
    {
        title: 'TP',
        dataIndex: 'diference',
        key: 'diference',
        width: 100
    },
    {
        title: 'Salida',
        dataIndex: 'finish_date',
        key: 'finish_date',
        width: 110,
    }
];

const EmployeeGrid = () => {

    const [items, setItems] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [employee, setEmployee] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);
 
    const handleMenuClick = (e) => {
        setEmployee((items.find(item => item.key === Number(e.key))).label)
        fetchTasks(e.key)
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const fetchTasks = async (employeeRef) => {
        try {
            const data = await getTasksPerAccId(employeeRef)
            setTasks(data)
        } catch (error) {
            console.error('Error')
        }
    }

    const fetchAccountantList = async () => {
        if (items.length === 0) {
            try { 
                const data = await getAccountantList();
                const menuItems = data.map(element => ({key:element.id, label:element.name }));
                setItems(menuItems)
                setDataLoaded(true)
            } catch (error) {
                console.error('Error la lista de contables', error);
            } 
        }
    };

    const callGeneratePDF = () =>{
        generatePDF(tasks, employee)
    }

    useEffect(()=>{
        fetchAccountantList()
    },[]);

    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AppHeader />
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
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <Button onClick={callGeneratePDF} style={{marginTop: '20px', marginRight: '10px', display: tasks.length === 0 ? 'none' : 'block'}}> Generar informe en PDF</Button>
                    <Button style={{marginTop: '20px', display: tasks.length === 0 ? 'none' : 'block'}}>
                        <Link to={'/employees/form'}>Ver/Editar información del empleado</Link>
                    </Button>
                </div>
            </div>
            <Row gutter={[16, 16]}>
                {tasks.map(task_type => <Col span={12}><TasksGrid key={task_type.type} tasks={task_type} columns={columns} scrollY={scrollY}/></Col>)}
            </Row>
            <Button type="primary" danger style={{margin: '20px', float: 'right', display: tasks.length === 0 ? 'none' : 'block'}}> Eliminar este empleado</Button>
        </>
    )
}

export default EmployeeGrid;