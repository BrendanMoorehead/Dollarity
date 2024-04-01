import { useEffect, useState } from 'react';
import useUpdateAccountBalance from '../Hooks/useUpdateAccountBalance';
import DollarInput from './DollarInput';
import { Form, Segmented } from 'antd';
const TransactionForm = ({hideTransactionModal, operationType, initialFormData}) => {
    const [transactionAmount, setTransactionAmount] = useState(initialFormData.amount.toFixed(2) || '0.00');
    const [transactionType, setTransactionType] = useState(initialFormData.type || "Expense");
    const [transactionDate, setTransactionDate] = useState(initialFormData.date || null);
    const [transactionNote, setTransactionNote] = useState(initialFormData.note || null);
    //Category information
    const [transactionCategoryId, setTransactionCategoryId] = useState(initialFormData.categoryId || null);
    const [transactionSubcategoryId, setTransactionSubcategoryId] = useState(initialFormData.subcategoryId || null);
    //Account information
    const [sendingAccountId, setSendingAccountId] = useState(initialFormData.sendingAccountId || null);
    const [receivingAccountId, setReceivingAccountId] = useState(initialFormData.receivingAccountId || null);

    const [formData, setFormData] = useState(initialFormData);

    const { accountBalanceLoading, reduceAccountBalance, increaseAccountBalance } = useUpdateAccountBalance();
    
    useEffect(() => {
        setFormData(initialFormData);
        console.log("Passed data: ", initialFormData);

    }, [initialFormData]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
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
                onChange={handleInputChange}
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
         <Form.Item>

        </Form.Item>
        {/* Transaction Date */}
        <Form.Item>

        </Form.Item>
    </Form>
  )
}

export default TransactionForm