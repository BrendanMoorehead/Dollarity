import { Input, Form } from "antd";
import { useState } from "react";
const NameInput = ({onChange}) => {
    const [name, setName] = useState("");

    const updateValue = (event) => {
        setName(event.target.value);

        onChange && onChange(name);
    }
  return (
    <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please enter the name of your account.' }]}
    >
        <Input 
            size="large"
            required={true}
            onChange={updateValue}
        />
    </Form.Item>
  )
}

export default NameInput