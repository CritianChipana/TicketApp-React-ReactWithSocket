import { Button, Col, Divider, Row, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { CloseCircleOutlined, RightOutlined  } from '@ant-design/icons'
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Redirect, useHistory } from 'react-router';
import { SocketContext } from '../context/SocketContext';

const { Title, Text } = Typography;

export const Escritorio = () => {

    useHideMenu(false);
    const historia = useHistory();
    const [usuario] = useState(getUsuarioStorage())
    const { socket } = useContext(SocketContext)
    const [ticket, setticket] = useState(null)

    const salir = () => {
        localStorage.clear();

        historia.replace('/register')
    }
    const siguienteTicket = ()=>{
        socket.emit('siguiente-ticket-trabajar', usuario, ( ticket )=>{
            setticket( ticket )
        })

    }

    if( !usuario.agente || !usuario.escritorio ){

        return <Redirect to="/ingresar" ></Redirect>

    }


    return (
        <>
            <Row>
                <Col span={20} >

                    <Title level={2} > {usuario.agente } </Title>
                    <Text> Usted esta trabjando en el escritorio : </Text>
                    <Text type='success' > { usuario.escritorio } </Text>

                </Col>
                <Col span={4}  aling= 'right'>

                    <Button
                        shape="round"
                        type = "danger"
                        onClick = { salir }
                    >
                        <CloseCircleOutlined/>
                            salir
                    </Button>

                </Col>
            </Row>

            <Divider/>

            {
                ticket && (

                    <Row>
                        <Col>
                            <Text> Esta atendiendo el ticket numero: </Text>
                            <Text style={{ fontSize: 30 }} type= "danger" > {ticket.numero} </Text>

                        </Col>
                    </Row>
                )
            }


            <Row>
                <Col offset= { 18 }  span= {6}  aling= 'right' >
                    <Button onClick={ siguienteTicket } 
                        shape="round"
                        type="primary"
                    >
                        <RightOutlined />
                        Siguiente
                    </Button>
                </Col>
            </Row>

        </>
    )
}
