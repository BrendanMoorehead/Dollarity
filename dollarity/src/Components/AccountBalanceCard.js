import React from 'react'

const AccountBalanceCard = ({balance}) => {
  return (
    <div style={styles.card}>
        <p style={styles.balanceAmount}>${balance.toFixed(2)}</p>
        <p style={styles.balanceText}>balance</p>

    </div>
  )
}

const styles = ({
    card: {
        padding: 30,
        backgroundColor: '#1f1f1f',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    balanceAmount: {
        color: '#dbdbdb',
        fontWeight: 'bold',
        fontSize: 60,
        margin: 0,
    }, 
    balanceText: {
        color: '#a1a1a1',
        fontSize: 20,
        margin: 0,
    }   
})

export default AccountBalanceCard