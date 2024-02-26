import { React, useState, useEffect } from 'react';
import { Table, Radio, Typography, Form, Popconfirm, InputNumber,Button } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import AppHeader from '../Header/Header';
import { mapPlanToColumn } from '../../api/data'
import { getGlobalPlan } from '../../api/getData';
import {findElementsStartingWithHyphen, formatDate} from '../../utils/utils'
import {Loading} from '../Loading/Loading'
import { EditableCell } from '../EditableCell/EditableCell';

const { Title } = Typography;


const oriColumns = [
    {
        title: 'Fecha', dataIndex: 'date', key: 'date', width: 90, fixed: 'left', editable: true, type: 'date'
    },
    {
        title: 'Bloq.', dataIndex: 'block', key: 'block', width: 40, fixed: 'left', editable: true
    },
    {
        title: 'Prior.', dataIndex: 'priority', key: 'priority', width: 40, fixed: 'left', editable: true
    },
    {
        title: 'Nº', dataIndex: 'company_number', key: 'company_number', width: 60, fixed: 'left', editable: true
    },
    {
        title: 'Empresa', dataIndex: 'company_name', key: 'company_name', width: 100, fixed: 'left', ellipsis: true, editable: true
    },
    {
        title: 'XD', dataIndex: 'xd', key: 'xd', width: 30, fixed: 'left', editable: true
    },

        {
            title: 'Extractos', key: 'extracts', editable: true,
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_ext', key: 'sit_ext', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_ext', key: 'con_ext', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                }, 
                {
                    title: 'TE', dataIndex: 'te_ext', key: 'te_ext', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TI', dataIndex: 'ti_ext', key: 'ti_ext', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_ext', key: 'tp_ext', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_ext', key: 'exit_ext', width: 90, editable: true,
                    onCell: (record) =>({
                        className: record.sit_ext === 'B' ? 'blocked' : ''}),
                }               
            ]
        },
        {
            title: 'IVA', key: 'vat', editable: true,
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_iva', key: 'sit_iva', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_iva', key: 'con_iva', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                }, 
                {
                    title: 'TE', dataIndex: 'te_iva', key: 'te_iva', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },  
                { 
                    title: 'TI', dataIndex: 'ti_iva', key: 'ti_iva', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_iva', key: 'tp_iva', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_iva', key: 'exit_iva', width: 90, editable: true,
                    onCell: (record) =>({
                        className: record.sit_iva === 'B' ? 'blocked' : ''}),
                }                   
            ]
        },
        {
            title: 'Inmovilizado', key: 'fixed assets', editable: true,
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_inm', key: 'sit_inm', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_inm', key: 'con_inm', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                }, 
                {
                    title: 'TE', dataIndex: 'te_inm', key: 'te_inm', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TI', dataIndex: 'ti_inm', key: 'ti_inm', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_inm', key: 'tp_inm', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_inm', key: 'exit_inm', width: 90, editable: true,
                    onCell: (record) =>({
                        className: record.sit_inm === 'B' ? 'blocked' : ''}),
                }                 
            ]
        },
        {
            title: 'Contable', key: 'accountable', editable: true,
            children: [
                {
                    title: 'Sit.', dataIndex: 'sit_acc', key: 'sit_acc', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },
                {
                    title: 'Con.', dataIndex: 'con_acc', key: 'con_acc', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                }, 
                { 
                    title: 'TE', dataIndex: 'te_acc', key: 'te_acc', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TI', dataIndex: 'ti_acc', key: 'ti_acc', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },  
                {
                    title: 'TP', dataIndex: 'tp_acc', key: 'tp_acc', width: 60, editable: true,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''}),
                },    
                {
                    title: 'Salida', dataIndex: 'exit_acc', key: 'exit_acc', width: 90, editable: true,
                    onCell: (record) =>({
                        className: record.sit_acc === 'B' ? 'blocked' : ''})
                }                 
            ]
        },
    {
        title: 'Fin.', dataIndex: 'ended', key: 'ended', width: 40, editable: true,
        onCell: (record) =>({
            className: record.ended === 'F' ? 'finished' : ''})
    },
    {
        title: 'Total', dataIndex: 'total_time', key: 'total_time', width: 60, editable: true,
    },
    {
        title: 'Con_rev', dataIndex: 'accountant_revisor', key: 'accountant_revisor', width: 45, editable: true,
    },
    {
        title: 'Con_rev_ant', dataIndex: 'prev_accountant_revisor', key: 'prev_accountant_revisor', width: 65, editable: true,
    },
];

const customHeader = (column) => ({
    ...column,
    onHeaderCell: (column) => {
        if (column.key === 'extracts'){
            return {
                className: 'extracts-header',
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
    const [year, setYear] = useState(2023);
    const [dataLoaded, setDataLoaded] = useState(false);
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
                <Popconfirm title="¿Seguro que deseas eliminar este plan?" onConfirm={() => handleDelete(record.key)}>
                  <a style={{color: 'red'}}><DeleteOutlined /></a>
                </Popconfirm>
              </span>
              );
            },
        },
    ]

    const handleAdd = () => {
        const newData = {
            key: new Date,
            date: '',
            block: false,
            priority: 0,
            company_number: null,
            company_name: null,
            xd: false,
            sit_ext: 'NP',
            con_ext: null,
            te_ext: null,
            ti_ext: null,
            tp_ext: null,
            exit_ext: null,
            sit_iva: 'NP',
            con_iva: null,
            te_iva: null,
            ti_iva: null,
            tp_iva: null,
            exit_iva: null,
            sit_inm: 'NP',
            con_inm: null,
            te_inm: null,
            ti_inm: null,
            tp_inm: null,
            exit_inm: null,        
            sit_acc: 'NP',      
            con_acc: null,
            te_acc: null,
            ti_acc: null,
            tp_acc: null,
            exit_acc: null,
            ended: null,
            total_time: null,
            accountant_revisor: '',
            prev_accountant_revisor: '',
        };
        setData([...data, newData]);
    };

    const onFinish = (value) => {
        setYear(value.year)
    };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const toggleQuarter = (e) => {
        setQuarter(e.target.value)
    }

    const fetchData = async (quarter,year) => {
        try {
            const data = await getGlobalPlan(year,quarter);
            setData(mapPlanToColumn(data))
            setDataLoaded(true)
        } catch (error) {
            console.error('Error al obtener los datos', error);
        }
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        const mergedTopLevelCol = {
          ...col,
          onCell: (record) => ({
            record,
            inputType: (col.dataIndex === 'date' || col.dataIndex.startsWith('exit_') || col.dataIndex === 'ended') 
                        ? 'date' 
                        : ((col.dataIndex === 'code' || col.dataIndex.startsWith('t') || col.dataIndex === 'priority')
                        ? 'number'
                        : ((col.dataIndex === 'block' || col.dataIndex === 'xd' || col.dataIndex === 'ended')
                        ? 'checkbox'
                        : 'dropdown'
                        )),
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };

        if (col.children) {
            mergedTopLevelCol.children = col.children.map(childCol => {
                if (!childCol.editable) {
                    return childCol
                }
                return {
                    ...childCol,
                    onCell: record => ({
                        record,
                        inputType: (childCol.dataIndex === 'date' || childCol.dataIndex.startsWith('exit_') || childCol.dataIndex === 'ended') 
                                    ? 'date' 
                                    : ((childCol.dataIndex === 'code' || childCol.dataIndex.startsWith('t') || childCol.dataIndex === 'priority')
                                    ? 'number'
                                    : ((childCol.dataIndex === 'block' || childCol.dataIndex === 'xd' || childCol.dataIndex === 'ended')
                                    ? 'checkbox'
                                    : 'dropdown'
                                    )),
                        dataIndex: childCol.dataIndex,
                        title: childCol.title,
                        editing: isEditing(record),
                        }),
                    };
                });   
            }
            return mergedTopLevelCol;  
    });

    useEffect(()=>{
        setDataLoaded(false)
        fetchData(quarter, year)
    },[quarter, year]);
    
    useEffect(()=>{
        findElementsStartingWithHyphen()
    },[data]);

    const edit = (record) => {
        Object.keys(record).forEach(key => {
            switch (key) {
                case 'date':
                case 'exit_ext':
                case 'exit_iva':
                case 'exit_inm':
                case 'exit_acc':
                case 'ended':
                    record[key] = formatDate(record[key]);
                    break;
                default:
                    break;
            }
        });

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

            Object.keys(row).forEach(key => {
                switch (key) {
                    case 'date':
                    case 'exit_ext':
                    case 'exit_iva':
                    case 'exit_inm':
                    case 'exit_acc':
                    case 'ended':
                        row[key] = row[key].format('YYYY-MM-DD');
                        break;
                    default:
                        break;
                }
            });

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
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-start'}}>

            <Title level={3} style={{padding: '10px'}}>Año </Title><Form
                name="basic"
                initialValues={{year: year}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size='large'
            >
                <Form.Item
                name="year"
                rules={[
                    {
                    required: true,
                    message: 'Por favor, introduce el año',
                    },
                ]}
                >
                <InputNumber />
                </Form.Item>
                </Form>
                
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Radio.Group style={{paddingBottom: '10px'}} value={quarter} buttonStyle="solid" onChange={toggleQuarter}>
                    <Radio.Button value={1}>T1</Radio.Button>
                    <Radio.Button value={2}>T2</Radio.Button>
                    <Radio.Button value={3}>T3</Radio.Button>
                    <Radio.Button value={4}>T4</Radio.Button>
                </Radio.Group>

                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                    marginBottom: 16,
                    }}
                >
                    Añadir un fila
                </Button>
                </div>
                <Form form={form} component={false}>
                <Table
                    components={{
                    body: {
                        cell: EditableCell,
                    },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns.map(customHeader)}
                    rowClassName="editable-row"
                    pagination={{defaultPageSize: 12}}
                    scroll={{ x: 3500, y: 650 }}
                    size='small'
                />
                </Form>
            </div>
        </>
  );
}