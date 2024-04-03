import React from 'react'
import TransactionTable from '../TransactionTable'
import CountCard from '../CountCard'
import useDates from '../../Hooks/useDates'
const TransactionPage = () => {
  const { currentMonth } = useDates();

  return (
    <div style={{padding: 20}}>
        <h2>Transactions</h2>
        <div style={styles.cardWrapper}>
        <CountCard title={`${currentMonth} Transactions`}/>
        <CountCard title={`${currentMonth} Spending`} />
        </div>
        <TransactionTable />
    </div>
  )
}
const styles = ({
  cardWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 20,
    paddingBottom: 20,
  }
})

export default TransactionPage