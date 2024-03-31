import React from 'react'
import { Button, Checkbox, Form, Input, ColorPicker, Segmented, notification } from 'antd';
import { useState } from 'react';
import DollarInput from './DollarInput';
import NameInput from './NameInput';
import { createAccount, fetchAccounts } from '../accountFunctions';
import { useContext } from 'react';
import { AuthContext } from './../AuthProvider';
import { DataContext } from './../DataProvider';
import { debounce } from 'lodash';
/**
 * A form for the user to enter all account details.
 * 
 * @returns A form that takes all the data needed to create a new monetary account. 
 */
const NewAccountForm = ({hideNewAccountModal}) => {
  const { user, loading } = useContext(AuthContext);
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [accountType, setAccountType] = useState('Spending');
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [color, setColor] = useState();

  const { accounts, createAccount } = useContext(DataContext);

  const changeAccountType = (value) => setAccountType(value);
  const changeAccountBalance = (value) => setAccountBalance(value);
  const changeAccountName = (value) => setAccountName(value);
  const changeColor = (value) => {
    console.log(value.toHex());
    setColor("#" + value.toHex());
  }
  const formSubmit = async () => {
    setFormSubmitLoading(true);
    try {
      const data = await createAccount(accountType, accountName, accountBalance, color);

    } catch (error) {
      console.log(error);
    }
    setFormSubmitLoading(false);
    hideNewAccountModal();
    openNotification('topRight');
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, ) => {
    api.success({
      message: `Account created`,
      description:
      `${accountName} has been added to your profile.`,
      placement,
    });
  };

  return (
   <Form>
      {contextHolder}
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
      <Form.Item>
        <ColorPicker onChange={(value) => changeColor(value)} />
      </Form.Item>
        <Button loading={formSubmitLoading} type="primary" size="large" block onClick={formSubmit}>
            Create Account
        </Button>
   </Form>
  )
}

export default NewAccountForm