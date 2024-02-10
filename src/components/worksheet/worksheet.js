import * as React from 'react';
import { Table, Radio, Typography } from 'antd';
import { dataSource } from '../../api/data'

const { Text } = Typography;

const columns = [
    {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
        width: 110,
        fixed: 'left'
    },
    {
        title: 'Bloq.',
        dataIndex: 'block',
        key: 'block',
        width: 75,
        fixed: 'left'
    },
    {
        title: 'Prior.',
        dataIndex: 'priority',
        key: 'priority',
        width: 75,
        fixed: 'left'
    },
    {
        title: 'Nº',
        dataIndex: 'company_number',
        key: 'company_number',
        width: 65,
        fixed: 'left'
    },
    {
        title: 'Empresa',
        dataIndex: 'company_name',
        key: 'company_name',
        width: 175,
        fixed: 'left'

    },
    {
        title: 'XD',
        dataIndex: 'xd',
        key: 'xd',
        width: 60,
        fixed: 'left'
    },

        {
            title: 'Extractos',
            key: 'extracts',
            children: [
                {
                    title: 'Sit.',
                    dataIndex: 'sit_ext',
                    key: 'sit_ext',
                    width: 65,
                },
                {
                    title: 'Con.',
                    dataIndex: 'con_ext',
                    key: 'con_ext',
                    width: 70
                }, 
                {
                    title: 'TE',
                    dataIndex: 'te_ext',
                    key: 'te_ext',
                    width: 100
                },  
                {
                    title: 'TI',
                    dataIndex: 'ti_ext',
                    key: 'ti_ext',
                    width: 100
                },  
                {
                    title: 'TP',
                    dataIndex: 'tp_ext',
                    key: 'tp_ext',
                    width: 100,
                    onCell: (record) =>({
                        className: record.tp_ext.startsWith('-') ? 'red-text' : ''})
                },    
                {
                    title: 'Salida',
                    dataIndex: 'exit_ext',
                    key: 'exit_ext',
                    width: 110
                }               
            ]
        },
        {
            title: 'IVA',
            key: 'vat',
            children: [
                {
                    title: 'Sit.',
                    dataIndex: 'sit_iva',
                    key: 'sit_iva',
                    width: 65
                },
                {
                    title: 'Con.',
                    dataIndex: 'con_iva',
                    key: 'con_iva',
                    width: 70
                }, 
                {
                    title: 'TE',
                    dataIndex: 'te_iva',
                    key: 'te_iva',
                    width: 100
                },  
                {
                    title: 'TI',
                    dataIndex: 'ti_iva',
                    key: 'ti_iva',
                    width: 100
                },  
                {
                    title: 'TP',
                    dataIndex: 'tp_iva',
                    key: 'tp_iva',
                    width: 100,
                    onCell: (record) =>({
                        className: record.tp_ext.startsWith('-') ? 'red-text' : ''})
                },    
                {
                    title: 'Salida',
                    dataIndex: 'exit_iva',
                    key: 'exit_iva',
                    width: 110
                }                   
            ]
        },
        {
            title: 'Inmovilizado',
            key: 'fixed assets',
            children: [
                {
                    title: 'Sit.',
                    dataIndex: 'sit_inm',
                    key: 'sit_inm',
                    width: 65
                },
                {
                    title: 'Con.',
                    dataIndex: 'con_inm',
                    key: 'con_inm',
                    width: 70
                }, 
                {
                    title: 'TE',
                    dataIndex: 'te_inm',
                    key: 'te_inm',
                    width: 100
                },  
                {
                    title: 'TI',
                    dataIndex: 'ti_inm',
                    key: 'ti_inm',
                    width: 100
                },  
                {
                    title: 'TP',
                    dataIndex: 'tp_inm',
                    key: 'tp_inm',
                    width: 100,
                    onCell: (record) =>({
                        className: record.tp_ext.startsWith('-') ? 'red-text' : ''})
                },    
                {
                    title: 'Salida',
                    dataIndex: 'exit_inm',
                    key: 'exit_inm',
                    width: 110
                }                 
            ]
        },
        {
            title: 'Contable',
            key: 'accountable',
            children: [
                {
                    title: 'Sit.',
                    dataIndex: 'sit_acc',
                    key: 'sit_acc',
                    width: 65
                },
                {
                    title: 'Con.',
                    dataIndex: 'con_acc',
                    key: 'con_acc',
                    width: 70
                }, 
                {
                    title: 'TE',
                    dataIndex: 'te_acc',
                    key: 'te_acc',
                    width: 100
                },  
                {
                    title: 'TI',
                    dataIndex: 'ti_acc',
                    key: 'ti_acc',
                    width: 100
                },  
                {
                    title: 'TP',
                    dataIndex: 'tp_acc',
                    key: 'tp_acc',
                    width: 100,
                    onCell: (record) =>({
                        className: record.tp_ext.startsWith('-') ? 'red-text' : ''})
                },    
                {
                    title: 'Salida',
                    dataIndex: 'exit_acc',
                    key: 'exit_acc',
                    width: 110
                }                 
            ]
        },
    {
        title: 'Fin.',
        dataIndex: 'ended',
        key: 'ended',
        width: 80,
        fixed: 'right'
    },
    {
        title: 'Total',
        dataIndex: 'total_time',
        key: 'total_time',
        width: 110
    },
    {
        title: 'Con_rev',
        dataIndex: 'accountant_revisor',
        key: 'accountant_revisor',
        width: 90
    },
    {
        title: 'Con_rev_ant',
        dataIndex: 'prev_accountant_revisor',
        key: 'prev_accountant_revisor',
        width: 110
    }
];

const customHeader = (column) => ({
    ...column,
    onHeaderCell: (column) => {
        if (column.key === 'extracts'){
            return {
                className: 'extracts-header'
            }
        }
        if (column.key === 'vat'){
            return {
                className: 'vat-header'
            }
        }
        if (column.key === 'fixed assets'){
            return {
                className: 'fixed-assets-header'
            }
        }
        if (column.key === 'accountable'){
            return {
                className: 'accountable-header'
            }
        }
    }
});

export default function Worksheet() {
    
    let [quarter, setQuarter] = React.useState("third-quarter");

    return (
        <>
            <Radio.Group value={quarter} buttonStyle="solid" onChange={(e) => setQuarter(e.target.value)}>
                <Radio.Button value="first-quarter">T1</Radio.Button>
                <Radio.Button value="second-quarter">T2</Radio.Button>
                <Radio.Button value="third-quarter">T3</Radio.Button>
                <Radio.Button value="fourth-quarter">T4</Radio.Button>
            </Radio.Group>
            <Table 
                columns={columns.map(customHeader)} 
                dataSource={dataSource} 
                pagination={ false } 
                scroll={{ x: 3500, y: 600 }}
                bordered={'bordered'}    
            />
        </>
  );
}