import React from 'react'
import { Form, Input, InputNumber, Segmented, Select, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import DollarInput from './DollarInput';
import { fetchAccounts } from '../accountFunctions';
const NewTransactionForm = () => {

    const [accounts, setAccounts] = useState([]);
    
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
        };

        getData();
    }, []);


    

    const selectChange = () => {

    }

    const dateChange = (date, dateString) => {
        console.log(date, dateString);
      };

    

  return (
    <Form style={{maxWidth: 400, padding: 20}}>
        <Form.Item>
            <DollarInput 
            />
        </Form.Item>
        <Form.Item>
            <Segmented size="large" options={["Expense", "Income", "Transfer"]} />
        </Form.Item>
        <Form.Item>
        <Select
            showSearch
            defaultValue="Category"
            style={{
            width: 200,
            }}
            onChange={selectChange}
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
        <Form.Item>
        <Select
            showSearch
            defaultValue="Account"
            style={{
            width: 200,
            }}
            onChange={selectChange}
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
            <Input />
        </Form.Item>
    </Form>
  )
}

export default NewTransactionForm