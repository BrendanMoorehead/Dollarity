import React from 'react'
import AverageSpendingChart from './AverageSpendingChart'
const AverageSpendingCard = () => {
  return (
    <div style={styles.card}>
        <p>Spending</p>
        <AverageSpendingChart />
    </div>
  )
}

const styles = ({
    card: {
        margin: 30
    }
})

export default AverageSpendingCard