import { Button, Form, ColorPicker, Segmented } from 'antd';
import { useState, useContext } from 'react';
import useCreateAccount from '../Hooks/useCreateAccount';
import { DataContext } from '../DataProvider';
import DollarInput from './DollarInput';
import NameInput from './NameInput';
import { accountAdded } from '../features/accounts/accountsSlice';
/**
 * A form for the user to enter all account details.
 * 
 * @returns A form that takes all the data needed to create a new monetary account. 
 */
const AccountForm = ({hideAccountModal}) => {
  const [form] = Form.useForm();

  const { createAccount } = useCreateAccount();
  //Form states
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0.00);
  const [type, setType] = useState('Spending');

  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  // Updates the account's name on change.
  const changeAccountName = (value) => setName(value);
  // Updates the account's balance on change.
  const changeAccountBalance = (value) => setBalance(value);
  // Updates the account type on change.
  const changeAccountType = (value) => setType(value);

  const accountFormSubmit = async () => {
    setFormSubmitLoading(true);
    try {
      const values = await form.validateFields();
      if (values) {
        console.log(values);
        await createAccount(values);
        
        hideAccountModal();
      }
    } catch (error) {
      console.log(error);
    }
    setFormSubmitLoading(false);
  }

  const initialValues = {
    name: '',
    type: 'Spending',
    balance: '0.00',
  };

  return (
   <Form form={form} onFinish={accountFormSubmit} initialValues={initialValues}>
    {/* Account Name Textbox */}
    <NameInput onChange={changeAccountName}/>
    {/* Account Type selector */}
    <Form.Item name='type'>
        <Segmented
          size='large'
          block
          options={["Spending", "Credit", "Debt"]}
          onChange={(value) => {changeAccountType(value)}}
          style={{userSelect: 'none', fontSize:"36px"}}
          value={type}
        />
    </Form.Item>    
    {/* Account Balance Textbox */}
    <Form.Item name='balance'>
      <DollarInput onChange={changeAccountBalance} />
    </Form.Item>
  
    {/* Submit Button */}
    <Form.Item>
      <Button 
        loading={formSubmitLoading} 
        type="primary" 
        htmlType='submit' 
        size="large" 
        block 
      >
        Create
      </Button>
    </Form.Item>
        
   </Form>
  )
}

export default AccountForm