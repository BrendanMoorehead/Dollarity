import React from 'react'

const TransactionCard = ({transaction}) => {
    const { id, created_at, date, type, amount, note, category, subcategory, user_id, sending_account_id, receiving_account_id } = transaction;
  return (
    <div>
    <div style={styles.card}>
        <div style={styles.flex}>
                <div style={styles.accountDetails}>
                <p style={styles.accountName}>{note}</p>
                <p style={styles.accountType}>{date}</p>
                </div>

                <div style={styles.accountBalance}>
                
                <p style={styles.balanceNumber}>${amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                <p style={styles.balanceHeader}>{type}</p>
                </div>
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

export default TransactionCard