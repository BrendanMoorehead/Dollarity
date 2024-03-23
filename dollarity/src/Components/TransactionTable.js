import React from 'react'
import { Divider, Radio, Table } from 'antd';
import useTransactions 
const TransactionTable = () => {

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
            dataIndex: 'category',
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

    const data = [ {

    }]

  return (
    <div>
        <Table
        
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default TransactionTable