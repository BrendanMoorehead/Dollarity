export const calculateAccountBalance = (currentBalance, amount) => {
    return Number(currentBalance.toFixed(2)) + Number(amount.toFixed(2));
}

/**
 * Takes a set of transactions and maps the cumulative spending to each date in the transaction set.
 * 
 * @param {*} transactions A list of transactions from the DB
 * @returns a mapping of dates, each with a cumulative sum value
 */
export const calculateCumulativeSum = (transactions) => {
    let cumulativeSum = 0;
    return transactions.map(transaction => {
        cumulativeSum += transaction.amount.toFixed(2);
        return {date: transaction.date, cumulativeSum}
    });
}

/**
 * Returns a dataset with a daily cumulative value for each day in a given month.
 * 
 * @param {*} transactions A list of transactions from the DB
 * @param {*} month The month to generate the dataset for
 * @param {*} year The year to generate the dataset for
 * @param {*} type The type of transaction (income, expense)
 * @returns 
 */
export const generateDailyDataset = (transactions, month, year, type) => {
    const filteredTransactions = transactions.filter(transaction => {
        const [transactionYear, transactionMonth] = transaction.date.split('-');
        return transactionYear === year && transactionMonth === month && transaction.type === type;
    });

    const dataset = {};
    filteredTransactions.forEach(transaction => {
        const day = transaction.date.split('-')[2];
        if (!dataset[day]){
            dataset[day] = [];
        }
        dataset[day].push(transaction);
    });

    const dailyCumulativeDataset = {};
    for (const day in dataset) {
        dailyCumulativeDataset[day] = calculateCumulativeSum(dataset[day]);
    }
    return dailyCumulativeDataset;
}