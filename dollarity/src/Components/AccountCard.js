import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import {Dropdown, Divider, Button, Space, Menu, Popconfirm} from 'antd';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { DataContext } from './../DataProvider';

const  AccountCard = ({account}) => {
    const { id, created_at, type, name, balance, user_id } = account;
    const {deleteAccount, getAccounts} = useContext(DataContext);
    const onClick = (e) => console.log(e);
    if (!account) {
        return <div>No account data available</div>;
    }


    const items = [
        {
            label: 'Info',
            key: '1',
            icon: <InfoCircleOutlined />,
          },
        {
          label: 'Edit',
          key: '2',
          icon: <EditOutlined />
        },
        {
          label: 'Delete',
          key: '3',
          icon: <DeleteOutlined />,
          danger: true,
          onClick: () => handleDeleteClick()
        },
        
    ];

    const handleDeleteClick = async () => {
        console.log('Delete');
        await deleteAccount(id);
        console.log('account delete success');
        await getAccounts();
    }

  return (
    <div style={styles.card}>
        <Dropdown
            arrow
            placement='bottomRight'
            dropdownRender={(menu) => (
                <div>
                    <Menu>
                        <Menu.Item key="1" onClick={(e) => console.log(e)}>
                            <InfoCircleOutlined /> Info
                        </Menu.Item>
                        <Menu.Item key="2" onClick={(e) => console.log(e)}>
                            <EditOutlined /> Edit
                        </Menu.Item>
                        <Menu.Item key="3" danger>
                            <Popconfirm
                                placement="bottomRight"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                title="Deleting this account will also remove all related transactions."
                                onConfirm={() => handleDeleteClick(account)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="#">
                                    <DeleteOutlined /> Delete
                                </a>
                            </Popconfirm>
                        </Menu.Item>
                    </Menu>
                </div>)}
            ><a style={{justifySelf: 'end'}} onClick={(e) => e.preventDefault()}>
            <MoreOutlined style={{fontSize:'16px', paddingTop: '12px', paddingRight:'4px', justifySelf: 'end'}}/>
            </a>
        </Dropdown>
        <div style={styles.flex}>
            <div style={styles.accountDetails}>
            <p style={styles.accountName}>{name}</p>
            <p style={styles.accountType}>{type}</p>
            </div>

            <div style={styles.accountBalance}>
            
            <p style={styles.balanceNumber}>${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p style={styles.balanceHeader}>balance</p>
            </div>
        </div>
    </div>
  )
}

const styles = {
    card: {
        backgroundColor: 'white', 
        padding: 6, 
        borderRadius: 20, 
        margin:20,
        width: '400px',
        display:'grid',
    },
    flex: {
        display: 'flex',
        padding: 20,
        justifyContent: 'space-between',
        gap: '30px'
    },
    accountName: {
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: 'none',
        margin: 0,
        alignSelf: 'end' 
    },
    accountType: {
        fontSize: '0.8rem',
        padding: 'none',
        margin: 0,
        paddingTop: '4px',
        color: '#8a8a8a',
        alignSelf: 'start'
    },
    accountDetails: {
        display: 'grid',
        alignItems: 'center',   
    }, 
    accountBalance: {
        display: 'grid',
        justifyItems: 'end',
        alignItems: 'center',
    },
    balanceHeader: {
        fontSize: '0.6rem',
        margin: 0,
        color: '#8a8a8a',
        alignSelf: 'start'
    },
    balanceNumber: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: 0,
        alignSelf: 'end'

    }
}

export default AccountCard