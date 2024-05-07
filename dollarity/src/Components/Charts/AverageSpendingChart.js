import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        april: 231,
        may: 240
    },
    {
        name: 24,
        april: 231,
        may: 240
    },
    {
        name: 25,
        april: 231,
        may: 240
    },
    {
        name: 26,
        april: 231,
        may: 240
    },
    {
        name: 27,
        april: 231,
        may: 240
    },
    {
        name: 28,
        april: 231,
        may: 240
    },
    {
        name: 29,
        april: 231,
        may: 240
    },
    {
        name: 30,
        april: 231,
        may: 240
    },
];

const AverageSpendingChart = () => {
  return (
<ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={tempData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="april" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="may" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
  )
}

export default AverageSpendingChart