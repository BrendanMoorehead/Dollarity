import React from 'react'
import useCategories from '../Hooks/useCategories'
import {ArrowUpOutlined, ArrowDownOutlined, SwapOutlined} from '@ant-design/icons'
import { Tooltip } from 'antd'
function IconComponent({ icon: Icon }) {
    return (
        <div style={{borderRadius: 50, backgroundColor: '#424242', width: 30, height: 30, display:'flex', justifyContent: 'space-evenly'}}>
            <Icon style={{color: '#ebebeb', fontSize: 20}}/>
        </div>
    )
}


const TransactionCard = ({transaction}) => {
    const { id, created_at, date, type, amount, note, category_id, subcategory_id, user_id, sending_account_id, receiving_account_id } = transaction;
    const {getSubcategoryNameById} = useCategories();
    let icon;
    if (!sending_account_id) icon = ArrowDownOutlined;
    else if (!receiving_account_id) icon = ArrowUpOutlined;
    else icon = SwapOutlined;

    const amountStyle = {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: 0,
        color: type === 'Income' ? '#8aff93' : '#ebebeb'
    }

  return (
    <div style={styles.card}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Tooltip placement="left" title={type}>
                    <a>
                    <IconComponent icon={icon} />
                    </a>
                </Tooltip>
                {/* <p style={styles.balanceHeader}>{type}</p> */}
            <div style={styles.accountDetails}>
                <p style={styles.accountName}>{note ? note : getSubcategoryNameById(subcategory_id)}</p>
            </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <p style={amountStyle}>{type === 'Expense' ? '-' : null}${amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
    </div>
  )
}

const styles = {
    direction: {

    },
    card: {
        padding: '16px', 
        borderRadius: 10, 
        width: '400px',
        display:'flex',
        justifyContent: 'space-between',
        boxShadow: '6px 6px 6px -5px rgba(0,0,0,0.8)'
    },
    accountName: {
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: 'none',
        margin: 0,
        color: '#ebebeb',
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
    
}

export default TransactionCard