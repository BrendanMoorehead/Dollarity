import React from 'react'
import { Form, Input, InputNumber, Segmented, Select, DatePicker } from 'antd';
import DollarInput from './DollarInput';
const NewTransactionForm = () => {

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
            options={[
            {
                label: <span>Entertainment</span>,
                title: 'entertainment',
                options: [
                {
                    label: <span>Hobby</span>,
                    value: 'hobby',
                },
                {
                    label: <span>Subscription</span>,
                    value: 'subscription',
                },
                ],
            },
            {
                label: <span>Food & drinks</span>,
                title: 'food & drinks',
                options: [
                {
                    label: <span>Groceries</span>,
                    value: 'groceries',
                },
                {
                    label: <span>Eating out</span>,
                    value: 'eating out',
                },
                ],
            },
            ]}
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
            options={[
            {
                label: <span>Spending</span>,
                title: 'spending',
                options: [
                {
                    label: <span>TD Checking Account</span>,
                    value: 'tdcheckingaccount'
                },
                {
                    label: <span>TD Cashback Credit Card</span>,
                    value: 'tdcashbackcreditcard',
                },
                ],
            },
            {
                label: <span>Saving</span>,
                title: 'saving',
                options: [
                {
                    label: <span>TD Everyday Savings</span>,
                    value: 'tdeverydaysavings',
                },
                {
                    label: <span>Emergency Fund</span>,
                    value: 'emergencyfund',
                },
                ],
            },
            ]}
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