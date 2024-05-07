import React from 'react'
import AverageSpendingChart from './AverageSpendingChart'
import { Select, Space } from 'antd';
import { useState } from 'react';
const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();
//Calculate previous month
const lastMonth = (currMonth === 0) ? 11 : currMonth - 1;
const lastYear = (lastMonth === 11) ? currYear - 1 : currYear; 

const lastMonthLabel = new Date(lastYear, lastMonth).toLocaleString('default', {month: 'long'})

const currentMonthLabel = currDate.toLocaleString('default', {month: 'long'});


const selectData = [
    {
        value: currentMonthLabel,
        label: 'This Month'
    },
    {
        value: lastMonthLabel,
        label: 'Last Month'
    },
    {
        value: 'Average',
        label: 'Average'
    }
]

const AverageSpendingCard = () => {
    const [line1, setLine1] = useState([currMonth, currYear]);
    const [line2, setLine2] = useState([]);

    const select1Change = (e) => {
        console.log(e);
        if (e === currentMonthLabel){
            setLine1([currMonth, currYear]);
        } else if (e === lastMonthLabel){
            setLine1([lastMonth, lastYear]);
        } else {
            setLine1(['Average']);
        }
        console.log(line1);
    }
    const select2Change = () => {

    }

  return (
    <div style={styles.card}>
        <div style={styles.headerWrapper}>
            <p style={styles.header}>Spending</p>
            <div style={styles.selectWrapper}>
                <Select 
                dropdownStyle={{ backgroundColor: 'green' }}
                style={styles.firstSelect}
                defaultValue={currentMonthLabel}
                options={selectData}
                onChange={select1Change}
                />
                <Select 
                style={{ width: 140}}
                defaultValue={'Last Month'}
                options={selectData}
                onChange={select2Change}
                />
            </div>
        </div>
        <AverageSpendingChart line1={line1}/>
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