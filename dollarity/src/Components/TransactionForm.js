import { useEffect, useState } from 'react';
import useUpdateAccountBalance from '../Hooks/useUpdateAccountBalance';
import DollarInput from './DollarInput';
import { Form, Segmented, Input, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import useUpdateTransaction from '../Hooks/useUpdateTransaction';
const TransactionForm = ({hideTransactionModal, operationType, initialFormData}) => {
    const [formData, setFormData] = useState(initialFormData);
    const {updateLoading, updateTransaction} = useUpdateTransaction();
    const { accountBalanceLoading, reduceAccountBalance, increaseAccountBalance } = useUpdateAccountBalance();
    
    useEffect(() => {
        setFormData(initialFormData);
        console.log("Passed data: ", initialFormData);
        console.log(initialFormData.date);
    }, [initialFormData]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            date: initialFormData.date
        }));
    }, [initialFormData.date]);

    const dateFormat = 'YYYY-MM-DD';
    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    }
    const handleNoteChange = (event) => {
        setFormData({
            ...formData,
            note: event.target.value
        });
    }
    const handleDateChange = (date, dateString) => {
        setFormData(prevState => ({
            ...prevState,
            date: dateString
        }));
      };
    const handleTypeChange = (event) =>{
        setFormData({
            ...formData,
            type: event
        });
    }

    const handleUpdate = () => {
        try {
            updateTransaction(formData);
        } catch (error) {
            console.error(error);
        }
    }
    const handleCreate = () => {

    }


  return (
    <Form
        style={{maxWidth: 600,}}
        layout="vertical"
    >
        {/* Transaction Amount */}
        <Form.Item 
            label="Transaction Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter the transaction amount' }]}
        >
            <DollarInput onChange={handleInputChange} startValue={formData.amount}/>
        </Form.Item>
        {/* Transaction Type */}
        <Form.Item>
            <Segmented 
                size="large" 
                options={["Expense", "Income", "Transfer"]}
                onChange={handleTypeChange}
                value={formData.type}
            />
        </Form.Item>
        {/* Transaction Category */}
        <Form.Item>

        </Form.Item>
        {/* Transaction Accounts */}
        <Form.Item>

            
        </Form.Item>
         {/* Transaction Notes */}
         <Form.Item
            label="Note"
            name="note"
            initialValue={formData.note} 
         >
            <Input 
                onChange={handleNoteChange}
                size="large"
            />
        </Form.Item>
        {/* Transaction Date */}
        <Form.Item
        label="Transaction Date"
         name="date"
         rules={[{ required: true, message: 'Please select a date!' }]}
        >
        <DatePicker 
            onChange={handleDateChange}  
            placeholder={formData.date}
            // defaultValue={dayjs(formData.date, dateFormat)} 
            format={dateFormat}
            size="large" 
        />
        </Form.Item>
        <Form.Item>
            {operationType === 'update' ?
                (<Button
                    onClick={handleUpdate}
                >Update Transaction</Button>)
                : (<Button
                    onClick={handleCreate}
                >Add Transaction</Button>)
            }
        </Form.Item>
    </Form>
  )
}

export default TransactionForm