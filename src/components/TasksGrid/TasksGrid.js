import { React } from 'react';
import { Table } from 'antd';

export default function TasksGrid(props) {
    
    console.log(props)
    let title_type = props.tasks.type
    
    const title = title_type === 'extracts' ? (<h2 className='title extracts-header'>Extractos</h2>) 
                    : (title_type === 'vat' ? (<h2 className='title vat-header'>IVA</h2>) 
                    : (title_type === 'fixed assets' ? (<h2 className='title fixed-assets-header'>Inmovilizado</h2>)
                    : (<h2 className='title accountable-header'>Contable</h2>)))


    return [
        title
        ,
        <Table 
                columns={props.columns} 
                dataSource={props.tasks.tasks} 
                pagination={ false } 
                scroll={{ x: 400, y: props.scrollY }}
                bordered={'bordered'}   
                size='small' 

        />
    ];
}