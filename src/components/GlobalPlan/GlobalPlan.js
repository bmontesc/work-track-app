import { React, useState, useEffect } from 'react';
import { Table, Radio, Typography, Form, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import AppHeader from '../Header/Header';
import { mapPlanToColumn } from '../../api/data'
import { getGlobalPlan } from '../../api/getData';
import {findElementsStartingWithHyphen} from '../../utils/utils'
import {Loading} from '../Loading/Loading'
import { EditableCell } from '../EditableCell/EditableCell';

const { Title } = Typography;


const oriColumns = [
    {
        title: 'Fecha', dataIndex: 'date', key: 'date', width: 60, fixed: 'left', editable: true
    },
    {
        title: 'Bloq.', dataIndex: 'block', key: 'block', width: 35, fixed: 'left', editable: true
    },
    {
        title: 'Prior.', dataIndex: 'priority', key: 'priority', width: 35, fixed: 'left', editable: true
    },
    {
        title: 'Nº', dataIndex: 'company_number', key: 'company_number', width: 40, fixed: 'left', editable: true
    },
    {
        title: 'Empresa', dataIndex: 'company_name', key: 'company_name', width: 100, fixed: 'left', ellipsis: true, editable: true
    },
    {
        title: 'XD', dataIndex: 'xd', key: 'xd', width: 30, fixed: 'left', editable: true
    },

        {
            title: 'Extractos', key: 'extracts',
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_ext', key: 'sit_ext', width: 30, editable: true,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_ext', key: 'con_ext', width: 30,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                }, 
                {
                    title: 'TE', dataIndex: 'te_ext', key: 'te_ext', width: 50,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TI', dataIndex: 'ti_ext', key: 'ti_ext', width: 50,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_ext', key: 'tp_ext', width: 50,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_ext', key: 'exit_ext', width: 60,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                }               
            ]
        },
        {
            title: 'IVA', key: 'vat',
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_iva', key: 'sit_iva', width: 30,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_iva', key: 'con_iva', width: 30,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                }, 
                {
                    title: 'TE', dataIndex: 'te_iva', key: 'te_iva', width: 50,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TI', dataIndex: 'ti_iva', key: 'ti_iva', width: 50,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_iva', key: 'tp_iva', width: 50,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_iva', key: 'exit_iva', width: 60,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                }                   
            ]
        },
        {
            title: 'Inmovilizado', key: 'fixed assets',
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_inm', key: 'sit_inm', width: 30,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_inm', key: 'con_inm', width: 30,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                }, 
                {
                    title: 'TE', dataIndex: 'te_inm', key: 'te_inm', width: 50,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TI', dataIndex: 'ti_inm', key: 'ti_inm', width: 50,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_inm', key: 'tp_inm', width: 50,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_inm', key: 'exit_inm', width: 60,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                }                 
            ]
        },
        {
            title: 'Contable', key: 'accountable',
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_acc', key: 'sit_acc', width: 30,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_acc', key: 'con_acc', width: 30,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                }, 
                {
                    title: 'TE', dataIndex: 'te_acc', key: 'te_acc', width: 50,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TI', dataIndex: 'ti_acc', key: 'ti_acc', width: 50,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_acc', key: 'tp_acc', width: 50,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_acc', key: 'exit_acc', width: 60,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''})
                }                 
            ]
        },
    {
        title: 'Fin.', dataIndex: 'ended', key: 'ended', width: 30,
        onCell: (record) =>({
            className: record.ended === 'F' ? 'finished' : ''})
    },
    {
        title: 'Total', dataIndex: 'total_time', key: 'total_time', width: 60
    },
    {
        title: 'Con_rev', dataIndex: 'accountant_revisor', key: 'accountant_revisor', width: 45
    },
    {
        title: 'Con_rev_ant', dataIndex: 'prev_accountant_revisor', key: 'prev_accountant_revisor', width: 55
    },
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

export default function GlobalPlan() {
    
    const [quarter, setQuarter] = useState(3);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataSource, setDataSource] = useState();
    const [form] = Form.useForm();
    let originData = []
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;


    const columns = [...oriColumns, 
        {
            title: 'Acción', dataIndex: 'operation', width: 70, fixed: 'right',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <span style={{ display: 'flex', justifyContent:'space-around'}}>
                  <Typography.Link
                    onClick={() => save(record.key)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    <SaveOutlined />
                  </Typography.Link>
                  <Popconfirm title="¿Seguro que desea cancelar la operación?" onConfirm={cancel}>
                    <a style={{color: 'red'}}><CloseOutlined /></a>
                  </Popconfirm>
                </span>
              ) : (
              <span style={{ display: 'flex', justifyContent:'space-around'}}>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <EditOutlined />
                </Typography.Link>
                <Popconfirm title="¿Seguro que deseas eliminar esta empresa?" onConfirm={() => handleDelete(record.key)}>
                  <a style={{color: 'red'}}><DeleteOutlined /></a>
                </Popconfirm>
              </span>
              );
            },
        },
    ]

    const toggleQuarter = (e) => {
        setDataLoaded(false)
        setQuarter(e.target.value)
        fetchData(e.target.value)
    }

    const fetchData = async (quarter) => {
        try {
            const data = await getGlobalPlan(2023,quarter);
            setDataSource(mapPlanToColumn(data))
            setDataLoaded(true)
        } catch (error) {
            console.error('Error al obtener los datos', error);
        }
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
    });

    useEffect(()=>{
        fetchData(3)
    },[]);
    
    useEffect(()=>{
        findElementsStartingWithHyphen()
    },[dataSource]);

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };
    
    const cancel = () => {
        setEditingKey('');
    };
    
    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        //Enviar la peticion para eliminar 
        setData(newData);
    };
    
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            console.log('Row', row)
            console.log('Data', data)
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
                //Enviar un PUT a la BBDD con el key: ID
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
                //Enviar un POST a la BBDD para crear el nuevo registro
              }
        } catch (errInfo) {
              console.log('Validate Failed:', errInfo);
        }
    };

    if (!dataLoaded) {
        return <Loading />;
    }

    return (
        <>
            <AppHeader />
            <div style={{padding: '15px'}}>
                <Title level={3}>Año 2023</Title>
                <Radio.Group style={{paddingBottom: '10px'}} value={quarter} buttonStyle="solid" onChange={toggleQuarter}>
                    <Radio.Button value={1}>T1</Radio.Button>
                    <Radio.Button value={2}>T2</Radio.Button>
                    <Radio.Button value={3}>T3</Radio.Button>
                    <Radio.Button value={4}>T4</Radio.Button>
                </Radio.Group>
                <Form form={form} component={false}>
                <Table
                    components={{
                    body: {
                        cell: EditableCell,
                    },
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns.map(customHeader)}
                    rowClassName="editable-row"
                    pagination={ false }
                    scroll={{ x: 2500, y: 650 }}
                    size='small'
                />
                </Form>
            </div>
        </>
  );
}