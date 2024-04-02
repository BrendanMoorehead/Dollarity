import { useEffect, useState } from 'react';
import useUpdateAccountBalance from '../Hooks/useUpdateAccountBalance';
import useCategories from '../Hooks/useCategories';
import useFetchAccounts from '../Hooks/useFetchAccounts';
import useCreateTransaction from '../Hooks/useCreateTransaction';
import DollarInput from './DollarInput';
import { Form, Segmented, Input, DatePicker, Button, Select } from 'antd';
import dayjs from 'dayjs';
import useUpdateTransaction from '../Hooks/useUpdateTransaction';
import AccountSelect from './AccountSelect';
const TransactionForm = ({hideTransactionModal, operationType, initialFormData}) => {
    const [formData, setFormData] = useState(initialFormData);
    const {updateLoading, updateTransaction} = useUpdateTransaction();
    const { accountBalanceLoading, reduceAccountBalance, increaseAccountBalance } = useUpdateAccountBalance();
    const { categoriesLoading, categoryList, getSubcategoryNameById } = useCategories();
    const {accounts, accountsLoading, error} = useFetchAccounts();
    const {createTransaction, createLoading, createError} = useCreateTransaction();
    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

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
            type: event,
            receiving_account_id: null,
            sending_account_id: null
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
        try {
            createTransaction(formData);
        } catch (error) {
            console.error(error);
        }
    }
    const selectChange = (value) => { 
        const [subcategoryId, categoryId] = value.split('_'); 
        setFormData({
            ...formData,
            category_id: categoryId,
            subcategory_id: subcategoryId
        });
    }
    const setAccount = (value, transactionDirection) => {
        console.log("Account #" + value + " is in " + transactionDirection);
        if (transactionDirection === 'to') {
            setFormData({
                ...formData,
                receiving_account_id: value
            });
        }else {
            setFormData({
                ...formData,
                sending_account_id: value
            });
        }
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
            <DollarInput onChange={handleInputChange} startValue={formData?.amount || 0}/>
        </Form.Item>
        {/* Transaction Type */}
        <Form.Item>
            <Segmented 
                size="large" 
                options={["Expense", "Income", "Transfer"]}
                onChange={handleTypeChange}
                value={formData?.type || "Expense"}
            />
        </Form.Item>
        {/* Transaction Category */}
        <Form.Item
            label="Category"
            name="category"
            initialValue={formData?.category_name || null}
        >
        <Select
            size='large'
            showSearch
            style={{
            width: 200,
            }}
            onChange={selectChange}
            options={categoryList.map(category => ({
                label: category.category,
                title: category.category,
                options: category.subcategories.map(subcategory => ({
                  label: subcategory.category,
                  value: `${subcategory.id}_${category.id}`,
                }))
              }))}
        />
        </Form.Item>
        {/* Transaction Accounts */}
        <Form.Item>
        {formData?.type !== "Income" ? <p>From:</p> : <p>To:</p>}
        <AccountSelect accounts={accounts} 
              onChange={
                (event) => {
                    const direction = formData.type !== "Income" ? "from" : 'to';
                    setAccount(event, direction);
                }
            }

        />
        </Form.Item>
        {formData?.type === 'Transfer' &&
        <Form.Item>
            <p>To:</p>
            <AccountSelect 
            accounts={accounts} 
              onChange={(event) => setAccount(event, 'to')}
        />
        </Form.Item>}
         {/* Transaction Notes */}
         <Form.Item
            label="Note"
            name="note"
            initialValue={formData?.note || null} 
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
            placeholder={formData?.date || null}
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