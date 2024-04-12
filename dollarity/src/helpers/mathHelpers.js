export const calculateAccountBalance = (currentBalance, amount) => {
    return Number(currentBalance.toFixed(2)) + Number(amount.toFixed(2));
}