import React from 'react';
import { Button, InputNumber, Form, Input, Typography } from 'antd';
import AppHeader from '../Header/Header';
const { Title } = Typography;

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const CompanyForm = () => (
<div>
    <AppHeader />
    <Title level={3}>Datos de la empresa</Title>
    <Form
        name="basic"
        labelCol={{
        span: 8,
        }}
        wrapperCol={{
        span: 16,
        }}
        style={{
        maxWidth: 600,
        }}
        initialValues={{
        remember: true,
        }}
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
            message: 'Por favor, introduce el nombre de la empresa',
            },
        ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Código empresa"
        name="code"
        rules={[
            {
                type: 'number',
                message: 'El código debe ser un número'
            },
            {
                required: true,
                message: 'Por favor, introduce el código de la empresa',
            },
        ]}
        >
        <InputNumber />
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
        label="Persona de contacto"
        name="contact_person"
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
            Submit
        </Button>
        </Form.Item>
    </Form>
  </div>
);
export default CompanyForm;