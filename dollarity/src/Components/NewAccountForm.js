import React from 'react'
import { Button, Checkbox, Form, Input, ColorPicker, Segmented, InputNumber, Steps, Flex, Row, Col, ConfigProvider } from 'antd';
import { useState } from 'react';
import DollarInput from './DollarInput';
import NameInput from './NameInput';
import { createAccount, fetchAccounts } from '../accountFunctions';
import { useContext } from 'react';
import { AuthContext } from './../AuthProvider';
import { debounce } from 'lodash';
/**
 * A form for the user to enter all account details.
 * 
 * @returns A form that takes all the data needed to create a new monetary account. 
 */
const NewAccountForm = () => {
  const { user, loading } = useContext(AuthContext);
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [accountType, setAccountType] = useState('Spending');
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  const changeAccountType = (value) => setAccountType(value);
  const changeAccountBalance = (value) => setAccountBalance(value);
  const changeAccountName = (value) => setAccountName(value);


  const formSubmit = async () => {
    setFormSubmitLoading(true);
    try {
      const data = await createAccount(accountType, accountName, accountBalance, user.id);
    } catch (error) {
      console.log(error);
    }
    setFormSubmitLoading(false);
  }

  const getAccounts = async () => {
    fetchAccounts();
  }

  return (
   <Form>
      <h2>New Account</h2>
      <Form.Item label={<span style={{ fontWeight: 'bold' }}>Type</span>} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Segmented
            size='large'
            block
            options={["Spending", "Credit", "Debt"]}
            onChange={(value) => {
              changeAccountType(value) // string
            }}
            style={{userSelect: 'none'}}
            value={accountType}
          />

        <h4>Name</h4>
        <NameInput onChange={changeAccountName}/>
        <h4>Current Balance</h4>
        <DollarInput onChange={changeAccountBalance} />
      </Form.Item>
        <Button loading={formSubmitLoading} type="primary" size="large" block onClick={formSubmit}>
            Create Account
        </Button>
        <Button type="primary" size="large" block onClick={getAccounts}>
            Fetch Accounts
        </Button>
   </Form>
  )
}

export default NewAccountForm