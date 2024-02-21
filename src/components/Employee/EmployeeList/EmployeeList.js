import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { setEmployeesList } from "../../../redux/employeesSlice";
import AppHeader from '../../Header/Header';
import {Loading} from '../../Loading/Loading'
import { getAccountantList } from '../../../api/getData';

const {Title} = Typography

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const EmployeeList = () => {

  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employees)
  const [dataLoaded, setDataLoaded] = useState(false);
  let originData = []

  const fetchAccountantList = async () => {
          try { 
              const data = await getAccountantList();
              dispatch(setEmployeesList(data))
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
                email: item.email}))
              setData(originData)
          } catch (error) {
              console.error('Error la lista de contables', error);
          } 
  };

  useEffect(()=>{
      fetchAccountantList()
  },[]);


  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
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
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      width: '10%',
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Primer Apellido',
      dataIndex: 'first_surname',
      width: '10%',
      editable: true,
      sorter: (a, b) => a.first_surname.localeCompare(b.first_surname),
    },
    {
      title: 'Segundo Apellido',
      dataIndex: 'second_surname',
      width: '10%',
      editable: true,
    },
    {
      title: 'Referencia',
      dataIndex: 'reference',
      width: '10%',
      editable: true,
      sorter: (a, b) => a.reference.localeCompare(b.reference),
    },
    {
      title: 'Direccion',
      dataIndex: 'address',
      width: '15%',
      editable: true,
    },
    {
      title: 'Ciudad',
      dataIndex: 'city',
      width: '10%',
      editable: true,
    },
    {
      title: 'Código Postal',
      dataIndex: 'zip_code',
      width: '10%',
      editable: true,
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone_number',
      width: '10%',
      editable: true,
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      width: '30%',
      editable: true,
    },
    {
      title: 'Operación',
      dataIndex: 'operation',
      width: '30%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Editar
          </Typography.Link>
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
        pagination={ false } 
      />
    </Form>
    </div>
    </>
  );
};
export default EmployeeList;