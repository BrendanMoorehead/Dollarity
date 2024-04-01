import { useEffect, useState } from 'react'
const TransactionForm = ({hideTransactionModal, operationType, ...data}) => {
    const [transactionAmount, setTransactionAmount] = useState(data.amount.toFixed(2) || '0.00');
    const [transactionType, setTransactionType] = useState(data.type || "Expense");
    const [transactionDate, setTransactionDate] = useState(data.date || null);
    const [transactionNote, setTransactionNote] = useState(data.note || null);
    //Category information
    const [transactionCategoryId, setTransactionCategoryId] = useState(data.categoryId || null);
    const [transactionSubcategoryId, setTransactionSubcategoryId] = useState(data.subcategoryId || null);
    //Account information
    const [sendingAccountId, setSendingAccountId] = useState(data.sendingAccountId || null);
    const [receivingAccountId, setReceivingAccountId] = useState(data.receivingAccountId || null);
    
  return (
    <div>TransactionForm</div>
  )
}

export default TransactionForm