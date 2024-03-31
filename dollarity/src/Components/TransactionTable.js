import React from 'react'
import { Divider, Radio, Table, Button, DatePicker, message, Tag } from 'antd';
import { EditFilled } from '@ant-design/icons';
import useDisplayTransaction from '../Hooks/useDisplayTransaction';
import { useState, useEffect } from 'react';
import useDeleteTransaction from '../Hooks/useDeleteTransaction';
import useFetchTransactions from '../Hooks/useFetchTransactions';

const { RangePicker } = DatePicker;

const TransactionTable = () => {
    const {displayTransaction, isLoading, error, refetchData} = useDisplayTransaction();
    const [messageApi, contextHolder] = message.useMessage();
    const {deleteTransactionsById} = useDeleteTransaction();
    const [selected, setSelected] = useState([]);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [filteredData, setFilteredData] = useState();
    const [tableLoading, setTableLoading] = useState(true);
    
    useEffect(() => {
      setTableLoading(true);
      if (!isLoading){
        console.log("Effect");
        const filtered = displayTransaction.filter(handleDateFilter);
        setFilteredData(filtered);
        console.log("filtered: ", filtered);
        setTableLoading(false);
      }
    }, [fromDate, toDate, displayTransaction, isLoading]);


    const onRangeChange = (dates, dateStrings) => {
      if (dates) {
        const fromDate = new Date(dateStrings[0]);
        const toDate = new Date(dateStrings[1]);
        setFromDate(fromDate);
        setToDate(toDate);
      } else {
          setFromDate(null);
          setToDate(null);
      }
    }

    const handleDateFilter = (value) => {
      const recordDate = new Date(value.date);
      if (fromDate && toDate) {
        return recordDate >= fromDate && recordDate <= toDate;
      } else if (fromDate) {
        return recordDate >= toDate;
      } else if (toDate) {
        return recordDate <= fromDate;
      }
      return true;
    }

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
        messageApi.open({
            type: 'error',
            content: 'Transaction deleted',
          });
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
            render: (sendingAccount) => (
                sendingAccount ? <Tag color={sendingAccount.color}>{sendingAccount.name}</Tag> : null
              ),
        },
        {
            title: 'Receiving Account',
            dataIndex: 'receiving_account',
            render: (receivingAccount) => (
                receivingAccount ? <Tag color={receivingAccount.color}>{receivingAccount.name}</Tag> : null
              ),
        },
        {
          title: 'Edit',

          render: () => (
            <Button icon={<EditFilled />}/>
          ),
        }

    ]

 
  return (
    <div>
        <Button onClick={deleteSelected}>
          Delete Selected
        </Button>
        <RangePicker onChange={onRangeChange}/>
        <Table
        rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        loading={tableLoading}
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  )
}

export default TransactionTable