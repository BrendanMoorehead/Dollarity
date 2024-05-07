import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { selectAllTransactions, fetchTransactions } from '../../features/transactions/transactionsSlice';

const tempData = [
    {
        name: 1,
        april: 200,
        may: 150
    },
    {
        name: 2,
        april: 220,
        may: 180
    },
    {
        name: 3,
        april: 220,
        may: 200
    },
    {
        name: 4,
        april: 231,
        may: 240
    },
    {
        name: 5,
        april: 231,
        may: 240
    },
    {
        name: 6,
        april: 231,
        may: 240
    },
    {
        name: 7,
        april: 231,
        may: 240
    },
    {
        name: 8,
        april: 231,
        may: 240
    },
    {
        name: 9,
        april: 231,
        may: 240
    },
    {
        name: 10,
        april: 231,
        may: 240
    },
    {
        name: 11,
        april: 231,
        may: 240
    },
    {
        name: 12,
        april: 231,
        may: 240
    },
    {
        name: 13,
        april: 231,
        may: 240
    },
    {
        name: 14,
        april: 231,
        may: 240
    },
    {
        name: 15,
        april: 231,
        may: 240
    },
    {
        name: 16,
        april: 231,
        may: 240
    },
    {
        name: 17,
        april: 231,
        may: 240
    },
    {
        name: 18,
        april: 231,
        may: 240
    },
    {
        name: 19,
        april: 231,
        may: 240
    },
    {
        name: 20,
        april: 231,
        may: 240
    },
    {
        name: 21,
        april: 231,
        may: 240
    },
    {
        name: 22,
        april: 231,
        may: 240
    },
    {
        name: 23,
        april: 241,
        may: 240
    },
    {
        name: 24,
        april: 256,
        may: 240
    },
    {
        name: 25,
        april: 330,
        may: 240
    },
    {
        name: 26,
        april: 390,
        may: 240
    },
    {
        name: 27,
        april: 415,
        may: 240
    },
    {
        name: 28,
        april: 960,
    },
    {
        name: 29,
        april: 1020,
    },
    {
        name: 30,
        april: 1300,
    },
];

const AverageSpendingChart = () => {

    const dispatch = useDispatch();
    const transactions = useSelector(selectAllTransactions);
    const transactionsStatus = useSelector(state => state.transactions.status);

    useEffect(() => {
        if (transactionsStatus === 'idle'){
            dispatch(fetchTransactions);
        }
    }, [transactionsStatus, dispatch]);

  return (
<ResponsiveContainer width="100%" height={340}>
        <LineChart
          width={500}
          height={300}
          data={tempData}
          margin={{
            top: 30,
            bottom: 30,
          }}
        >
        <defs>
        </defs>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(tick) => {
            return `$${tick}`;
            }}/>
          <Tooltip formatter={(d) => '$' + parseFloat(d).toFixed(2)}/>
          <Legend />
            {(transactionsStatus === 'succeeded') &&
            (
                <Line type="monotone" dataKey="april" stroke="#009447" dot={false} strokeWidth={3}/>
            )}
        </LineChart>
      </ResponsiveContainer>
  )
}

export default AverageSpendingChart