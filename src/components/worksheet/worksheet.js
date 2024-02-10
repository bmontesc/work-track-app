import * as React from 'react';
import {Table, Sheet} from '@mui/joy';
import { data_array } from '../../api/data'

export default function Worksheet() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
      <Sheet sx={{ width: '95%', height:'720px', overflowX: 'auto', overflowY: 'auto', margin: '20px'}}>
        <Table 
            borderAxis="both"
            color="neutral"
            stripe={'odd'}
            size="lg"
            stickyFooter={false}
            stickyHeader
            variant="outlined"
            sx={{ tableLayout: 'auto', borderCollapse: 'collapse', width: 'auto', "--TableCell-paddingY": '0', "--TableCell-paddingX": '5px' }}
            >
            <thead>
                <tr style={{ alignContent: 'center'}}>
                    <th rowSpan={2}>Año</th>
                    <th rowSpan={2}>Fecha</th>
                    <th rowSpan={2}>Trim.</th>
                    <th rowSpan={2}>Bloq.</th>
                    <th rowSpan={2}>Prior.</th>
                    <th rowSpan={2}>Nº</th>
                    <th rowSpan={2}>Nombre Empresa</th>
                    <th rowSpan={2}>XD</th>
                    <th colSpan={6}  style={{ backgroundColor: '#ff7a7a', textAlign: 'center' }}>Extractos</th>
                    <th colSpan={6}  style={{ backgroundColor: '#7dff7a', textAlign: 'center' }}>IVA</th>
                    <th colSpan={6}  style={{ backgroundColor: '#fdff7a', textAlign: 'center' }}>Inmovilizado</th>
                    <th colSpan={6}  style={{ backgroundColor: '#7a95ff', textAlign: 'center' }}>Contable</th>
                    <th rowSpan={2}>Fin</th>
                    <th rowSpan={2}>Total</th>
                    <th rowSpan={2}>Con Rev</th>
                    <th rowSpan={2}>Con Rev Ant</th>
                </tr>
                <tr>
                    <th>Sit.</th>
                    <th>Con.</th>
                    <th>T. Estimado</th>
                    <th>T. Incurrido</th>
                    <th>Diferencia</th>
                    <th>Salida</th>
                    <th>Sit.</th>
                    <th>Con.</th>
                    <th>T. Estimado</th>
                    <th>T. Incurrido</th>
                    <th>Diferencia</th>
                    <th>Salida</th>
                    <th>Sit.</th>
                    <th>Con.</th>
                    <th>T. Estimado</th>
                    <th>T. Incurrido</th>
                    <th>Diferencia</th>
                    <th>Salida</th>
                    <th>Sit.</th>
                    <th>Con.</th>
                    <th>T. Estimado</th>
                    <th>T. Incurrido</th>
                    <th>Diferencia</th>
                    <th>Salida</th>

                </tr>
            </thead>
            <tbody>
                {data_array.map((data) => (
                <tr key={data.date}>
                    <td>{data.year}</td>
                    <td>{data.date}</td>
                    <td>{data.quarter}</td>
                    <td>{data.block}</td>
                    <td>{data.priority}</td>
                    <td>{data.company_number}</td>
                    <td>{data.company_name}</td>
                    <td>{data.xd}</td>
                    {data.tasks.map((task)=>(
                        <>
                        <td>{task.status}</td>
                        <td>{task.accountant_code}</td>
                        <td>{task.estimated_time}</td>
                        <td>{task.used_time}</td>
                        <td>{task.diference}</td>
                        <td>{task.finish_date}</td>
                        </>
                    ))}
                    <td>{data.ended}</td>
                    <td>{data.total_time}</td>
                    <td>{data.accountant_revisor}</td>
                    <td>{data.prev_accountant_revisor}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    </Sheet>
</div>
  );
}