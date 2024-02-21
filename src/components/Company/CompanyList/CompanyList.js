import React, { useState, useEffect } from 'react';
import { Form, Popconfirm, Table, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import AppHeader from '../../Header/Header';
import {Loading} from '../../Loading/Loading'
import { getCompaniesList } from '../../../api/getData';
import { EditableCell } from '../../EditableCell/EditableCell';


const {Title} = Typography

const CompanyList = () => {

    const [form] = Form.useForm();
    let originData = []
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [dataLoaded, setDataLoaded] = useState(false);

  const fetchAccountantList = async () => {
          try { 
              const data = await getCompaniesList();
              setDataLoaded(true)
              originData = data.map((item) => ({
                key: item.id, 
                name: item.name,
                code: item.code,
                address: item.address,
                zip_code: item.zip_code, 
                city: item.city, 
                phone_number: item.phone, 
                email: item.email,
                contact_person: item.contact_person
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
      title: 'Nombre', dataIndex: 'name', width: '10%', editable: true, 
    },
    {
      title: 'Código empresa', dataIndex: 'code', width: '10%', editable: true,
      sorter: (a, b) => a.code - b.code,
    },
    {
      title: 'Direccion', dataIndex: 'address', width: '15%', editable: true,
    },
    {
      title: 'Ciudad', dataIndex: 'city', width: '10%', editable: true,
    },
    {
      title: 'Código Postal', dataIndex: 'zip_code', width: '10%', editable: true,
    },
    {
      title: 'Teléfono', dataIndex: 'phone_number', width: '10%', editable: true,
    },
    {
      title: 'Correo', dataIndex: 'email', width: '10%', editable: true,
    },
    {
      title: 'Persona de contacto', dataIndex: 'contact_person', width: '30%', editable: true,
    },
    {
      title: 'Acción', dataIndex: 'operation', width: '30%',
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
  ];
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

  if (!dataLoaded) {
    return <Loading />;
  }

  return (
    <>
    <AppHeader />
    <div style={{padding: '15px'}}>
      <Title level={3}>Lista de empresas</Title>
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
export default CompanyList;