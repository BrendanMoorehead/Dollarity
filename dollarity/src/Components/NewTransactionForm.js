import React from 'react'
import { Form, Input, InputNumber, Segmented, Select, DatePicker, Cascader, Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import DollarInput from './DollarInput';
import { useContext } from 'react';
import useCategories from '../Hooks/useCategories';
import { AuthContext } from './../AuthProvider';
import { DataContext } from './../DataProvider';
import { createTransaction, fetchAccounts, fetchCategories } from '../accountFunctions';
import useFetchTransactions from '../Hooks/useFetchTransactions';
const NewTransactionForm = ({hideNewTransactionModal, passedTransactionData}) => {
    const {transactions, isLoading, error, refetch} = useFetchTransactions();
    const {transfer, addTransaction, getAccounts} = useContext(DataContext);
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const {categoryList, getSupercategoryId} = useCategories();

    const [transactionState, setTransactionState] = useState(() => {
        const defaultTransactionData = {
          amount: '0.00',
          type: 'Expense',
          cat: null,
          subcat: null,
          date: null,
          transactionNote: null
        };
        return { ...defaultTransactionData, ...passedTransactionData };
      });
    
      useEffect(() => {
        // Update state when transactionData prop changes
        setTransactionState(prevState => ({ ...prevState, ...passedTransactionData }));
      }, [passedTransactionData]);
    const { amount, type, cat, subcat, date, transactionNote } = transactionState;
    //Data Input
    const [transactionAmount, setTransactionAmount] = useState(amount);
    const [transactionType, setTransactionType] = useState(type);
    const [category, setCategory] = useState(cat);
    const [subcategory, setSubcategory] = useState(subcat);
    const [transactionDate, setTransactionDate] = useState(date);
    const [note, setNote] = useState(transactionNote);
    
    //Account IDs for the accounts sending and recieving funds. 
    const [fromAccount, setFromAccount] = useState();
    const [toAccount, setToAccount] = useState();

    

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
            const categories = localStorage.getItem('categories');
            setCategories(JSON.parse(categories));
        };

        getData();
    }, []);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, desc) => {
        api.success({
        message: `Transaction added`,
        description: desc,
        placement,
        });
    };


    const newTransaction = async () => {
        if (transactionType === "Transfer"){
            try{
            console.log(fromAccount, toAccount, transactionAmount);
            const {fromAccountData, toAccountData} = await transfer(fromAccount, toAccount, transactionAmount);
            const transaction = await addTransaction(transactionDate, transactionType, transactionAmount, note, fromAccount, toAccount, category, subcategory);
            console.log(transaction);
            hideNewTransactionModal();
            openNotification('topRight', 
            `$${transactionAmount} transferred from ${fromAccountData.name} to ${toAccountData.name}.`);

            } catch (error) {
                console.error(error);
            }
        }
        else if (transactionType === 'Income'){
            try{
                const transaction = await addTransaction(transactionDate, transactionType, transactionAmount, note, fromAccount, toAccount, category, subcategory);
                console.log("Transaction Log: Income ", transaction);
                
                hideNewTransactionModal();
                
                openNotification('topRight', 
                `Recieved $${transactionAmount} to ${transaction.name}.`);
                
                } catch (error) {
                    console.error(error);
                }
        }
        else if (transactionType === 'Expense'){
            try{
                const transaction = await addTransaction(transactionDate, transactionType, transactionAmount, note, fromAccount, toAccount, category, subcategory);
                console.log(transaction);
                
                hideNewTransactionModal();
                openNotification('topRight', 
                `Spent $${transactionAmount} from ${transaction.name}.`);
    
                } catch (error) {
                    console.error(error);
                }
        }
        refetch();
    }

    const selectChange = (value) => { 
        console.log(value);
        const [subcategoryId, categoryId] = value.split('_'); 
        console.log(categoryId);
        setCategory(categoryId);
        setSubcategory(subcategoryId);
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
    const setAccount = (value, transactionDirection) => {
        transactionDirection === 'to' ? setToAccount(value) : setFromAccount(value);
        console.log("Account #" + value + " is in " + transactionDirection);
    }        

const typeChange = (e) => {setTransactionType(e);
                console.log(e);};
    

  return (
    <Form style={{maxWidth: 400, padding: 20}}>
        {contextHolder}
        <Form.Item>
            <DollarInput onChange={amountChange} startValue={transactionAmount}
            />
        </Form.Item>
        <Form.Item>
            <Segmented 
            size="large" 
            options={["Expense", "Income", "Transfer"]}
            onChange={typeChange}
            value={transactionType}
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
            options={categories.map(category => ({
                label: category.category,
                title: category.category,
                options: category.subcategories.map(subcategory => ({
                  label: subcategory.category,
                  value: `${subcategory.id}_${category.id}`,
                }))
              }))}
        />
        </Form.Item>
        <Form.Item>
        {transactionType !== "Income" ? <p>From:</p> : <p>To:</p>}
        <Select
            showSearch
            defaultValue="Account"
            style={{
            width: 200,
            }}
            onChange={
                (event) => {
                    const direction = transactionType !== "Income" ? "from" : 'to';
                    setAccount(event, direction);
                }
            }
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

        {transactionType === 'Transfer' &&
        <Form.Item>
            <p>To:</p>
        <Select
            showSearch
            defaultValue="Account"
            style={{
            width: 200,
            }}
            onChange={(event) => setAccount(event, 'to')}
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
        }

        <Form.Item >
            <DatePicker onChange={dateChange} />
        </Form.Item>
        <Form.Item label='Note'>
            <Input onChange={noteChange}/>
        </Form.Item>
        <Form.Item>
        <Button onClick={newTransaction}>
            Submit
        </Button>
        </Form.Item>
    </Form>
  )
}

export default NewTransactionForm