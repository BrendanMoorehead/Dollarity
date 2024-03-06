import React, {useState} from 'react'
import { Form, Input, Button } from 'antd';
import { supabase } from '../supabaseClient';
import { getCurrentUser, signUpWithEmail } from '../utils/auth';
const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
          const signUp = signUpWithEmail(email,password);
          console.log('Signup successful:', signUp);
          // Redirect the user to another page, or handle the success in some other way
        } catch (error) {
          console.error('Error signing up:', error.message);
          // Display error message to the user
        }
      };

  return (
    <Form style={{backgroundColor:"white", borderRadius: 10, padding: 20, margin: 20}} 
        >
        <Form.Item 
        label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input onChange={(e) => setEmail(e.target.value)}/>

        </Form.Item>
        <Form.Item label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password onChange={(e) => setPassword(e.target.value)}/>
        </Form.Item>
        <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" onClick={handleSignup}>
        Submit
      </Button>
    </Form.Item>
    </Form>
  )
}

export default LoginForm