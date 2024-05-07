import React from 'react'
import AverageSpendingChart from './AverageSpendingChart'
import { Select, Space } from 'antd';

const selectData = [
    {
        value: 'This Month',
        label: 'This Month'
    },
    {
        value: 'Last Month',
        label: 'Last Month'
    },
    {
        value: 'Average',
        label: 'Average'
    }
]

const AverageSpendingCard = () => {
  return (
    <div style={styles.card}>
        <div style={styles.headerWrapper}>
            <p style={styles.header}>Spending</p>
            <div style={styles.selectWrapper}>
                <Select 
                dropdownStyle={{ backgroundColor: 'green' }}
                style={styles.firstSelect}
                defaultValue={'This Month'}
                options={selectData}
                />
                <Select 
                style={{ width: 140}}
                defaultValue={'Last Month'}
                options={selectData}
                />
            </div>
        </div>
        <AverageSpendingChart />
    </div>
  )
}

const styles = ({
    card: {
        margin: 30
    },
    header: {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    headerWrapper: {
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectWrapper: {
        display: 'flex',
        gap: '10px'
    },
    firstSelect: {
        width: 140,
        border: 'green'
    }
})

export default AverageSpendingCard