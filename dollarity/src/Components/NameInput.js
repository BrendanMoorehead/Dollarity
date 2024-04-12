import { Input, Form } from "antd";
import { useState } from "react";
const NameInput = ({onChange}) => {
    const [name, setName] = useState("");

    const updateValue = (event) => {
        const value = event.target.value;
        setName(value);

        onChange && onChange(value);
    }
  return (
    <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please enter the name of your account.' }]}
    >
        <Input 
            style={{fontSize:"36px"}}
            size="large"
            onChange={updateValue}
            placeholder="Account Name"
        />
    </Form.Item>
  )
}

export default NameInput