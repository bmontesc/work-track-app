import React, { useEffect } from 'react';
import { Button, Form, Input, Typography, Alert, Layout } from 'antd';
import {useUser} from '../../utils/useUser.js';
import { useNavigate } from 'react-router-dom';
// import logo_web_1 from '../../../public/Gestoria_files/logo_web_1.jpg'
const { Title } = Typography;
const { Header} = Layout;

const LogIn = () => {

    const { isLoading, hasError, logInAuth, isLogged } = useUser()
    const navigate = useNavigate()

    const onFinish = async (e) => {
        try {
            logInAuth(e)
            form.resetFields()
        } catch (err) {
            console.log(err)
            form.resetFields()
        }
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        form.resetFields()
    };

    const [form] = Form.useForm();

    useEffect(()=>{
        if (isLogged) navigate("/home")
    },[isLogged])

    return (
        <>
        <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent:'center',
          marginBottom: '20px',
          padding:'20px'
        }}>
            <img src='https://btasesores.com/images/logo_web_1.jpg'  />
        </Header>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
            <Title level={3}>Inicio de sesión</Title>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
             >
                <Form.Item 
                    label="Ususario" 
                    name="username"  
                    rules={[{required: true, message: 'Por favor, introduce un nombre de usuario'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                    label="Contraseña" 
                    name="password" 
                    rules={[{required: true, message: 'Por favor, introduce tu contraseña'}]}
                >
                    <Input.Password />
                </Form.Item>

                {hasError ? <Alert
                    message="Credenciales inválidas"
                    type="error"
                    closable
                    />
                    : <></>}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button style={{margin: '10px'}} type="primary" htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </>
    );
};
export default LogIn;