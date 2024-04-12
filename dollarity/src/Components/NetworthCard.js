import { useDataContext } from "../DataProvider"

const NetworthCard = () => {
  const { networth } = useDataContext();
  return (
    <div style={styles.wrapper}>
        <p>{networth}</p>
        <p>Networth</p>
    </div>
  )
}

const styles = ({
  wrapper: {
    padding: '20px'
  }
})

export default NetworthCard