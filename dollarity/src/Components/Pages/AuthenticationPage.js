import React from 'react'
import { Col, Row, Flex } from 'antd';
const AuthenticationPage = () => {
  return (
   <Row style={{height: '100vh'}}>
    <Col span={12} style={{backgroundColor: "#0a0a0a"}}>
        <Flex vertical gap='middle' align='center' justify='center' width={200}>
            <h1 style={{color: 'white'}}>Everyday spending, simplified.</h1>
            <h3 style={{color: 'white'}}>Effortlessly track every transaction and make more informed decisions about your money.</h3>
        </Flex>
    </Col>
    <Col span={12} style={{backgroundColor: '#121212'}}>col-8</Col>
   </Row>
  )
}

export default AuthenticationPage