import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import AppHeader from '../../Header/Header';

import { Link, useParams } from "react-router-dom";

const { Title } = Typography;

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const EmployeeForm = () => {
    
    let {id} = useParams();
    let initialValues = {}
    const employeeList = useSelector((state) => state.employees)

    if (id !== 'new') {
        const {name, first_surname, second_surname, reference, address, zip_code, city, phone_number, email} = ((employeeList.find(emp => emp.id === Number(id))))
        initialValues = {name, first_surname, second_surname, reference, address, zip_code, city, phone_number, email}
    }

    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };
    
    
    return (
    
        <div >
            <AppHeader />
            
            <Button style={{marginTop: '20px'}}>
                <Link to={'/employees'}> <LeftOutlined /> Volver</Link>
            </Button>
            
            <Title level={3}>Datos del trabajador</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600,}}
                initialValues={initialValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Nombre"
                name="name"
                rules={[
                    {
                    required: true,
                    message: 'Por favor, introduce el nombre del trabajador',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Primer Apellido"
                name="first_surname"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, introduce el primer apellido',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Segundo Apellido"
                name="second_surname"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, introduce el segundo apellido',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Referencia"
                name="reference"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, introduce la referencia del empleado',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Dirección"
                name="address"
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Código Postal"
                name="zip_code"
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Ciudad"
                name="city"
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Teléfono"
                name="phone"
                rules={[
                    {
                        type: 'number',
                        message: 'Por favor, introduce un número de teléfono correcto'
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Correo electrónico"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Por favor, introduce una direccion de correo válida',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Enviar
                </Button>
                </Form.Item>
            </Form>
    </div>
)};
export default EmployeeForm;