import { Typography } from 'antd';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import AppHeader from "../Header/Header";
import { Loading } from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { getEmployeeRanking } from '../../api/getData';
const { Title } = Typography;

const colors = ['#88de5c', '#fb725d', '#fbc35d']
const colorsBar = ['#7bc5fe', '#a5e587', '#ffd37d', '#f99596']
const data = [
  {
    "name": "Extractos",
    "%": 90,
  },
  {
    "name": "IVA",
    "%": 34,
  },
  {
    "name": "Inmovilizado",
    "%": 47,
  },
  {
    "name": "Contable",
    "%": 76,
  }
]

export const Dashboard = () => {

  const [dataLoaded, setDataLoaded] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  let dataMin
  let dataMax

  const fetchData = async (quarter,year) => {
    try {
        const data = await getEmployeeRanking(year,quarter);
        setEmployeeData(data.sort((a,b)=> b.Porcentaje - a.Porcentaje))
        setDataLoaded(true)
    } catch (error) {
        console.error('Error al obtener los datos', error);
    }
  };

  useEffect(() => (
    fetchData(3, 2023)
  ), [])

  useEffect (()=> {
    dataMax = Math.max(...employeeData.map(item => item.Porcentaje)) 
    dataMin = Math.min(...employeeData.map(item => item.Porcentaje)) 
  }, [employeeData])

  if (!dataLoaded) {
    return <Loading />;
}

return (
    <div>         
      <AppHeader />  
      <Title level={3} style={{padding: '0px 20px'}}>Porcentaje de tareas finalizadas</Title>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', margin: '-50px 0px'}}>  
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="%" fill="#8884d8">
        {
          data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colorsBar[index]}/>
          ))
        } 
        </Bar>
      </BarChart>
      <PieChart width={500} height={400}>
        <Pie data={[{'name': 'Finalizadas', 'value': 62},{'name':'Pendientes', 'value': 24},{'name': 'Bloqueadas', 'value': 14}]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({name, value}) => `${name}: ${value}%`}>
        {
          data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]}/>
          ))
        }  
        </Pie>
      </PieChart>
      </div>
      <Title level={3} style={{padding: '0px 20px'}}>Desviación de horas estimadas (%)</Title>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: '10px'}}>
      <BarChart width={1000} height={300} data={employeeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[-100, 100]} />
        <Tooltip />
        <Bar dataKey="Porcentaje" fill="#8884d8">
        </Bar>
      </BarChart>
      </div>
    </div>
)};