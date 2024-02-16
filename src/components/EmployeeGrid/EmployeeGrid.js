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
    const [dataLoaded, setDataLoaded] = useState(false);
    const [ menuItems, setMenuItems ] = useState([]);
 
    const handleMenuClick = (e) => {
        setEmployee((items.find(item => item.key === e.key)).label)
        setEmployeeCode(e.key)
    };

    const menuProps = {
        menuItems,
        onClick: handleMenuClick,
    };

    const fetchData = async (quarter) => {
        if (menuItems.length > 0) {
            console.log('hola')
        } else {
            try { 
                const data = await getAccountantList();
                console.log(data)
                setDataLoaded(true)
                data.forEach(element => {
                    const items = []
                    items.push({label:element.name, key:element.id})
                    setMenuItems(items)
                });
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
