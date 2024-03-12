import React from 'react'
import { Form, Input, InputNumber, Segmented, Select, DatePicker, Cascader, Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import DollarInput from './DollarInput';
import { useContext } from 'react';
import { AuthContext } from './../AuthProvider';
import { createTransaction, fetchAccounts, fetchCategories } from '../accountFunctions';
const NewTransactionForm = ({hideNewTransactionModal}) => {
    const { user, loading } = useContext(AuthContext);
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);

    //Data Input
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState('expense');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [transactionDate, setTransactionDate] = useState(null);
    const [note, setNote] = useState(null);
    const [account, setAccount] = useState();

    useEffect(() => {

        const getData = async () => {
            const data = await fetchAccounts();
            setAccounts(data);

            setAccounts(data.reduce((acc, item) => {
                if (!acc[item.type]) {
                  acc[item.type] = [];
                }
                acc[item.type].push(item);
                return acc;
              }, {}));
            const categories = await fetchCategories();
            setCategories(categories);
        };

        getData();
    }, []);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.success({
        message: `Transaction added`,
        description:
        `${transactionAmount} has been deducted from ${account}.`,
        placement,
        });
    };


    const addTransaction = async () => {
        try{
            await createTransaction(
                transactionDate, 
                transactionType, 
                transactionAmount,
                note,
                account,
                category,
                subcategory,
                user.id
            );
        } catch (error) {
            console.error(error);
        }
        hideNewTransactionModal();
        openNotification('topRight');
    }

    const selectChange = (value) => { 
        console.log(value);
        setCategory(value[0]);
        setSubcategory(value[1]);
    }

    const dateChange = (date, dateString) => {
        console.log(date, dateString);
        setTransactionDate(dateString);
      };

    const amountChange = (value) => setTransactionAmount(value);

    const noteChange = (e) =>{
        console.log(e.target.value);
        setNote(e.target.value);
    } 
    const accountChange = (e) => {setAccount(e);
         console.log(e);};

    

  return (
    <Form style={{maxWidth: 400, padding: 20}}>
        {contextHolder}
        <Form.Item>
            <DollarInput onChange={amountChange}
            />
        </Form.Item>
        <Form.Item>
            <Segmented 
            size="large" 
            options={["Expense", "Income", "Transfer"]}
            onChange={accountChange}
            />
        </Form.Item>
        <Form.Item>
        <Select
            size='large'
            showSearch
            defaultValue="Category"
            style={{
            width: 200,
            }}
            onChange={selectChange}
            options={categories}
        />
        </Form.Item>
        <Form.Item>
        <Select
            showSearch
            defaultValue="Account"
            style={{
            width: 200,
            }}
            onChange={accountChange}
            options={Object.keys(accounts).map(type => ({
                label: <span>{type}</span>,
                title: type.toLowerCase(),
                options: accounts[type].map(item => ({
                label: <span>{item.name}</span>,
                value: item.id.toString()
                }))
            }))
        }
        />
        </Form.Item>
        <Form.Item >
            <DatePicker onChange={dateChange} />
        </Form.Item>
        <Form.Item label='Note'>
            <Input onChange={noteChange}/>
        </Form.Item>
        <Form.Item>
        <Button onClick={addTransaction}>
            Submit
        </Button>
        </Form.Item>
    </Form>
  )
}

export default NewTransactionForm