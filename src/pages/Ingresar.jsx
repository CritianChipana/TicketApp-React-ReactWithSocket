import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useHistory, Redirect } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';


const { Title, Text } = Typography;

export const Ingresar = () => {

    const history = useHistory();

    const [usuario] = useState(getUsuarioStorage())
    console.log(usuario);
    useHideMenu(false);


    const onFinish = ({ agente, escritorio }) => {

        localStorage.setItem('agente',agente)
        localStorage.setItem('escritorio',escritorio)

        history.push( '/escritorio' )

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if( usuario.agente && usuario.escritorio ){

        return <Redirect to="/escritorio" ></Redirect>

    }

    return (
        <>
            <Title label= { 2 } >Ingresar</Title>
            <Text> Ingrese su nombre y numero de escritorio </Text>
            <Divider></Divider>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 14,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre del agene"
                    name="agente"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su nombre!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="escritorio"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese el numero de escritorio!',
                        },
                    ]}
                >
                    <InputNumber min={ 1 } max = { 99 } />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 14,
                    }}
                >
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        shape="round"
                    >
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>

        </>

    )
}
