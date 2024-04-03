import React from 'react'
import { Table, Button, DatePicker, message, Tag, Modal, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useDisplayTransaction from '../Hooks/useDisplayTransaction';
import { useState, useEffect } from 'react';
import useDeleteTransaction from '../Hooks/useDeleteTransaction';
import TransactionForm from './TransactionForm';
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
    const [transactionFormModal, setTransactionFormModal] = useState(false);
    const [transactionData, setTransactionData] = useState(null);

    const renderDate = (text) => {
      const date = new Date(text);
      const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return utcDate.toLocaleDateString('en-US', options);
  };

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

    const showTransactionFormModal = () => {
      setTransactionFormModal(true);
    }
    const hideTransactionFormModal = () => {
      setTransactionData(null);
      setTransactionFormModal(false);
    };


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
    const displayEditPopup = async (id) => {
      console.log("Edit Clicked: " + id);
      const transaction = filteredData.find(item => item.id === id);
      setTransactionData(transaction);
      showTransactionFormModal();
      console.log("EditTrans: ", transaction);
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
            render: renderDate
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
          title: 'Actions',
          render: (_, transaction) => (
            <div style={{display: 'flex', gap: '10px'}}>
            <Tooltip title="Edit">
              <Button icon={<EditOutlined />} onClick={() => displayEditPopup(transaction.id)}/>
            </Tooltip>
            <Tooltip title="Delete">
              <Button icon={<DeleteOutlined />} onClick={() => displayEditPopup(transaction.id)}/>
            </Tooltip>
            </div>
          ),
        }

    ]

 
  return (
    <div>
        <div style={styles.functionSection}>
          <div style={styles.filterWrapper}>
            <RangePicker onChange={onRangeChange} size="large"/>
          </div>
          <div style={styles.filterWrapper}>
            <div style={styles.buttonWrapper}>
            <Button onClick={deleteSelected} size="large" danger>
              Delete Selected
            </Button>
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              Add Transaction
            </Button>
            </div>
          </div>
        </div>
        <Table
        rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        loading={tableLoading}
        columns={columns}
        dataSource={filteredData}
      />
      <Modal open={transactionFormModal} footer={null} onCancel={hideTransactionFormModal}>
        {/* <NewTransactionForm hideTransactionFormModal={hideTransactionFormModal} passedTransactionData={{
          amount: transactionData?.amount,
          type: 'Income',
          cat: 'Income',
          subcat: `${transactionData?.subcategory_id}_${transactionData?.category_id}`,
          date: '2024-03-31',
          transactionNote: 'Transaction Note'
        }}/> */}
        <TransactionForm hideTransactionFormModal={hideTransactionFormModal} operationType={"update"} initialFormData={transactionData}/>
      </Modal>
    </div>
  )
}

const styles = ({
  functionSection: {
    display: 'flex',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    display: 'flex',
    gap: 10
  }
})

export default TransactionTable