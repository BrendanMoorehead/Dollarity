import React from 'react'
import { Divider, Radio, Table, Button, DatePicker } from 'antd';
import useDisplayTransaction from '../Hooks/useDisplayTransaction';
import { useState } from 'react';
import useDeleteTransaction from '../Hooks/useDeleteTransaction';
import useFetchTransactions from '../Hooks/useFetchTransactions';

const { RangePicker } = DatePicker;

const TransactionTable = () => {
    const {displayTransaction, isLoading, error, refetchData} = useDisplayTransaction();
    const {deleteTransactionsById} = useDeleteTransaction();
    const [selected, setSelected] = useState([]);

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelected(selectedRowKeys);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    const deleteSelected = async () => {
      try {
        console.log(selected);
        await deleteTransactionsById(selected);
        refetchData();
      } catch (error) {
        console.error(error);
      }
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a, b) => new Date(b.date) - new Date(a.date),
            defaultSortOrder: 'ascend',
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
            dataIndex: 'category_name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            filters: [
              {
                text: 'Expense',
                value: 'Expense'
              },
              {
                text: 'Income',
                value: 'Income'
              },
              {
                text: 'Transfer',
                value: 'Transfer'
              },
            ],
            onFilter: (value, record) => record.type === value,
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
        <Button onClick={deleteSelected}>
          Delete Selected
        </Button>
        <RangePicker />
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