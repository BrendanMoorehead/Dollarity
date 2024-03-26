import React from 'react'
import { Divider, Radio, Table } from 'antd';
import useDisplayTransaction from '../Hooks/useDisplayTransaction';
import useFetchTransactions from '../Hooks/useFetchTransactions';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

const TransactionTable = () => {

    const {displayTransaction, isLoading, error} = useDisplayTransaction();

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a, b) => new Date(b.date) - new Date(a.date),
            render: (text) => {
                const date = new Date(text);
                const options = {year: 'numeric', month: 'long', day: 'numeric'};
                return date.toLocaleDateString('en-US', options);
            },
            
        },
        {
            title: 'Note',
            dataIndex: 'note',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            className: 'column-money',
            align: 'right',
            render: (text) => `$${parseFloat(text).toFixed(2)}`
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
        {
            title: 'Edit',
            dataIndex: 'edit',
        }
        
    ]

 
  return (
    <div>
        <Table
        rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        loading={isLoading}
        columns={columns}
        dataSource={displayTransaction}
      />
    </div>
  )
}

export default TransactionTable