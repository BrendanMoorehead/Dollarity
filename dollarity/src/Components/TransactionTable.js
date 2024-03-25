import React from 'react'
import { Divider, Radio, Table } from 'antd';
import useDisplayTransaction from '../Hooks/useDisplayTransaction';
import useFetchTransactions from '../Hooks/useFetchTransactions';
const TransactionTable = () => {

    const {displayTransaction, isLoading, error} = useDisplayTransaction();

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Note',
            dataIndex: 'note',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Category',
            dataIndex: 'category_id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Sending Account',
            dataIndex: 'sending_account',
        },
        {
            title: 'Receiving Account',
            dataIndex: 'receiving_account',
        },
        
    ]

 
  return (
    <div>
        <Table
        loading={isLoading}
        columns={columns}
        dataSource={displayTransaction}
      />
    </div>
  )
}

export default TransactionTable