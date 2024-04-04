import TransactionTable from '../TransactionTable'

const TransactionPage = () => {
  return (
    <div style={{paddingLeft: 80, paddingRight: 80, paddingTop:20,}}>
        <h2>Transactions</h2>
        <TransactionTable />
    </div>
  )
}

export default TransactionPage