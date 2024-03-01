import React from 'react'
import { Button, Checkbox, Form, Input, ColorPicker } from 'antd';
/**
 * A form for the user to enter all account details.
 * 
 * @returns A form that takes all the data needed to create a new monetary account. 
 */
const NewAccountForm = () => {
    const newAccountSubmit = () => {
        console.log("Submission");
    }
  return (
   <Form
    name="newAccount"
    onFinish={newAccountSubmit}
   >
    <Form.Item
        label="Account Name"
        name="accountName"
    >
        <Input/>
    </Form.Item>

    <Form.Item
        label="Account Color"
        name="accountColor"
    >
        <ColorPicker defaultValue="#1677ff" />
    </Form.Item>

   </Form>
  )
}

export default NewAccountForm