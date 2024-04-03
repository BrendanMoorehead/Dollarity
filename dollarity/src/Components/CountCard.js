const CountCard = ({title, value}) => {
  return (
    <div style={styles.card}>
        <p style={styles.title}>{title}</p>
        <p style={styles.count}>{value}</p>
    </div>
  )
}

const styles = ({
    card: {
        backgroundColor: "#242424",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        margin: 0,
        color: "white",
    },
    count: {
        margin: 0,
    }
});

export default CountCard