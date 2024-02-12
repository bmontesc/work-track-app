import { React } from 'react';
import { Table } from 'antd';

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

export default function TasksPerCompany(props) {
    
    const title = props.type === 'extracts' ? (<h2 className='title extracts-header'>Extractos</h2>) 
                    : (props.type === 'vat' ? (<h2 className='title vat-header'>IVA</h2>) 
                    : (props.type === 'fixed assets' ? (<h2 className='title fixed-assets-header'>Inmovilizado</h2>)
                    : (<h2 className='title accountable-header'>Contable</h2>)))


    return [
        title
        ,
        <Table 
                columns={columns} 
                dataSource={props.tasks} 
                pagination={ false } 
                scroll={{ x: 400, y: 125 }}
                bordered={'bordered'}   
                size='small' 

        />
    ];
}