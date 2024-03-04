import React from 'react'
import { Button, Checkbox, Form, Input, ColorPicker, Segmented, InputNumber, Steps, Flex, Row, Col, ConfigProvider } from 'antd';
import { useState } from 'react';
import DollarInput from './DollarInput';
/**
 * A form for the user to enter all account details.
 * 
 * @returns A form that takes all the data needed to create a new monetary account. 
 */
const NewAccountForm = () => {


  return (
   <Form>
      <h2>New Account</h2>
      <Form.Item>
          <h4>Type</h4>
          <ConfigProvider
  theme={{
    components: {
      Segmented: {
        itemSelectedBg: '#99ffe0'
      },
    },
  }}
>
          <Segmented
            block
            options={["Spending", "Credit", "Debt"]}
            onChange={(value) => {
              console.log(value); // string
            }}
          /></ConfigProvider>
      </Form.Item>
      <Form.Item>
        <h4>Name</h4>
        <Input />
      </Form.Item>
      <Form.Item>
        <h4>Current Balance</h4>
        <DollarInput />
      </Form.Item>
      <Row justify="space-evenly"> 
        <Col span={12}>
        <Button type="primary" block>
            Create Account
        </Button></Col>
        <Col span={6}>
        <Button type="primary" danger ghost block>
          Clear
        </Button>
        </Col>
      </Row>
   </Form>
  )
}

export default NewAccountForm