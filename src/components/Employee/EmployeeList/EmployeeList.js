import React, { useState, useEffect } from 'react';
import { Form, Popconfirm, Table, Typography } from 'antd';
import AppHeader from '../../Header/Header';
import {Loading} from '../../Loading/Loading'
import { getAccountantList } from '../../../api/getData';
import { EditableCell } from '../../EditableCell/EditableCell';

const {Title} = Typography

const EmployeeList = () => {

    const [form] = Form.useForm();
    let originData = []
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [dataLoaded, setDataLoaded] = useState(false);
    

    const fetchAccountantList = async () => {
        try { 
            const data = await getAccountantList();
            setDataLoaded(true)
            originData = data.map((item) => ({
                key: item.id, 
                name: item.name,
                first_surname: item.first_surname,
                second_surname: item.second_surname ? item.second_surname : '',
                reference: item.reference,
                address: item.address,
                zip_code: item.zip_code, 
                city: item.city, 
                phone_number: item.phone_number, 
                email: item.email
            }))
            setData(originData)
        } catch (error) {
            console.error('Error la lista de contables', error);
        } 
    };

    useEffect(()=>{
        fetchAccountantList()
    },[]);


    
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



    const columns = [
      {
        title: 'Nombre', dataIndex: 'name', width: '8%', editable: true,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Primer Apellido', dataIndex: 'first_surname', width: '8%', editable: true,
        sorter: (a, b) => a.first_surname.localeCompare(b.first_surname),
      },
      {
        title: 'Segundo Apellido', dataIndex: 'second_surname', width: '8%', editable: true,
      },
      {
        title: 'Referencia', dataIndex: 'reference', width: '5%', editable: true,
        sorter: (a, b) => a.reference.localeCompare(b.reference),
      },
      {
        title: 'Direccion', dataIndex: 'address', width: '15%', editable: true,
      },
      {
        title: 'Ciudad', dataIndex: 'city', width: '5%', editable: true,
      },
      {
        title: 'Código Postal', dataIndex: 'zip_code', width: '10%', editable: true,
      },
      {
        title: 'Teléfono', dataIndex: 'phone_number', width: '10%', editable: true,
      },
      {
        title: 'Correo', dataIndex: 'email', width: '20%', editable: true,
      },
      {
        title: 'Operación', dataIndex: 'operation', width: '40%',
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
                Guardar
              </Typography.Link>
              <Popconfirm title="¿Seguro que desea cancelar la operación?" onConfirm={cancel}>
                <a>Cancelar</a>
              </Popconfirm>
            </span>
          ) : (
          <span style={{ display: 'flex', justifyContent:'space-around'}}>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Editar
            </Typography.Link>
            <Popconfirm  title="¿Seguro que deseas eliminar este empleado?" onConfirm={() => handleDelete(record.key)}>
              <a style={{color: 'red'}} disabled={editingKey !== ''}>Borrar</a>
            </Popconfirm>
          </span>
          );
        },
      },
    ];



    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'phone_number' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    if (!dataLoaded) {
        return <Loading />;
    }

    return (
        <>
          <AppHeader />
          <div style={{padding: '15px'}}>
            <Title level={3}>Lista de empleados</Title>
            <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                />
            </Form>
          </div>
        </>
  );
};

export default EmployeeList;