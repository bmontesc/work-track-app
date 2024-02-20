import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"; 
import { Cascader, Button, Typography, Row, Col } from 'antd';
import { setCompaniesList } from "../../../redux/companiesSlice";
import AppHeader from '../../Header/Header';
import TasksGrid from '../../TasksGrid/TasksGrid';
import { getCompaniesList, getTasksPerComId } from '../../../api/getData';
import generatePDF from "../../PDFReport/PDFReport";
import {Loading} from '../../Loading/Loading'

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
        dataIndex: 'status',
        key: 'status',
        width: 50,
    }, 
    {   title: 'Con.',
        dataIndex: 'accountant_code',
        key: 'accountant_code',
        width: 30,
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
        width: 100,
    },    
    {
        title: 'Salida',
        dataIndex: 'finish_date',
        key: 'finish_date',
        width: 110,
    }               
];

const CompanyGrid = () => {

    const [options, setOptions] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [company, setCompany] = useState();
    const [dataLoaded, setDataLoaded] = useState(false);

    const dispatch = useDispatch();
    const companyList = useSelector((state) => state.companies)

    const onChange = (value, selectedOptions) => {
        if (selectedOptions) {
            fetchTasks(selectedOptions[0].key)
            setCompany((companyList.find(comp => comp.id === selectedOptions[0].key)))
        }
    };

    const fetchTasks = async (companyId) => {
        try {
            const data = await getTasksPerComId(companyId)
            setTasks(data)
        } catch (error) {
            console.error('Error')
        }
    }

    const fetchCompanyList = async () => {
        if (options.length === 0) {
            try { 
                const data = await getCompaniesList();
                dispatch(setCompaniesList(data))
                const menuItems = data.map(element => ({key:element.id, label:element.name, value: element.name.toLowerCase() }));
                setOptions(menuItems)
                setDataLoaded(true)
            } catch (error) {
                console.error('Error la lista de empresas', error);
            } 
        }
    };

    const filter = (inputValue, path) =>
        path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

    const callGeneratePDF = () =>{
        generatePDF(tasks, null, company.name)
    }

    useEffect(()=>{
        fetchCompanyList()
    },[]);

    if (!dataLoaded) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <AppHeader />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '20px', paddingRight: '20px' }}>
                <Title level={4}>
                    Selecciona la empresa: 
                    <Cascader
                        options={options}
                        onChange={onChange}
                        placeholder="Please select"
                        showSearch={{ filter }}
                    />
                </Title>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <Button onClick={callGeneratePDF} style={{marginTop: '20px', marginRight: '10px', display: tasks.length === 0 ? 'none' : 'block'}}> Generar informe en PDF</Button>
                    <Button style={{marginTop: '20px', display: tasks.length === 0 ? 'none' : 'block'}}>
                        <Link to={`/companies/form/${company ? company.id : 'new'}`}>Ver/Editar información de la empresa</Link>
                    </Button>
                </div>
            </div>
            <Row gutter={[16,16]}>
                {tasks.map(task_type => <Col span={24}><TasksGrid key={task_type.type} tasks={task_type} columns={columns} scrollY={scrollY}/></Col>)}
            </Row>
            <Button type="primary" danger style={{margin: '20px', float: 'right', display: tasks.length === 0 ? 'none' : 'block'}}> Eliminar esta empresa</Button>
        </>
    )
}

export default CompanyGrid;
