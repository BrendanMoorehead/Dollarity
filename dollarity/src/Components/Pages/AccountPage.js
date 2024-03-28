import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
const AccountPage = () => {
  const { id } = useParams();

  return (
    <div>Account ID: {id}</div>
  )
}

export default AccountPage