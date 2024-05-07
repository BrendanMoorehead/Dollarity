import React from 'react'
import AverageSpendingChart from './AverageSpendingChart'
const AverageSpendingCard = () => {
  return (
    <div style={styles.card}>
        <AverageSpendingChart />
    </div>
  )
}

const styles = ({
    card: {
        backgroundColor: 'white',
    }
})

export default AverageSpendingCard