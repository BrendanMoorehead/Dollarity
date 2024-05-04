import { EditFilled, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Table, Button, DatePicker, message, Tag, Modal, Tooltip, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import useDeleteTransaction from '../Hooks/useDeleteTransaction';
import useDisplayTransaction from '../Hooks/useDisplayTransaction';
import TransactionForm from './TransactionForm';
const LightTransactionTable = () => {
    const {displayTransaction, isLoading, error, refetchData} = useDisplayTransaction();
    const [filteredData, setFilteredData] = useState([]);
    const {deleteTransactionsById} = useDeleteTransaction();
    const [transactionData, setTransactionData] = useState(null);
    const [transactionFormModal, setTransactionFormModal] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    
    useEffect(() => {
        setTableLoading(true);
        if (!isLoading){
          console.log("Effect");
          setFilteredData(displayTransaction);
          setTableLoading(false);
        }
      }, [displayTransaction, isLoading]);

    const renderDate = (text) => {
        const date = new Date(text);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return utcDate.toLocaleDateString('en-US', options);
    };
    const displayEditPopup = async (id) => {
        console.log("Edit Clicked: " + id);
        const transaction = filteredData.find(item => item.id === id);
        setTransactionData(transaction);
        showTransactionFormModal();
        console.log("EditTrans: ", transaction);
      }

      const showTransactionFormModal = () => {
        setTransactionFormModal(true);
      }
      const hideTransactionFormModal = () => {
        setTransactionData(null);
        setTransactionFormModal(false);
      };
      const deleteSingle = async (transactionId) => {
        try {
          await deleteTransactionsById([transactionId]);
          refetchData();
        } catch (error) {
          console.error(error);
        }
      }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            defaultSortOrder: 'ascend',
            render: renderDate
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
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
        },
        {
          title: 'Actions',
          render: (_, transaction) => (
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
            <Tooltip title="Edit">
              <Button icon={<EditFilled />} onClick={() => displayEditPopup(transaction.id)}/>
            </Tooltip>
            <Popconfirm
              placement="topRight"
              title="Delete transaction"
              description={`Are you sure you want to delete?`}
              onConfirm={() => (deleteSingle(transaction.id))}
              onCancel={() => (console.log("Hello"))}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteFilled />} />
            </Popconfirm>
            </div>
          ),
          align: 'center'
        }

    ]

  return (
    <div >
        <Table
            loading={tableLoading}
            columns={columns}
            dataSource={filteredData}
            pagination={{pageSize: 5}}
        />
        <Modal open={transactionFormModal} footer={null} onCancel={hideTransactionFormModal}>
            <TransactionForm hideTransactionFormModal={hideTransactionFormModal} operationType={"update"} initialFormData={transactionData}/>
      </Modal>
    </div>
  )
}

export default LightTransactionTable