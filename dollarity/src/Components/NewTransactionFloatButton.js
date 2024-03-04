import React from 'react'
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const NewTransactionFloatButton = () => {
  return (
    <FloatButton 
        tooltip={"New Transaction"} 
        icon={<PlusOutlined />}
        onClick={() => console.log('onClick')} 
    />
  )
}


export default NewTransactionFloatButton