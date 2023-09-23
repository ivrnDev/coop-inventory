const pool = require('../../config/database.js');
const {orderQueries} = require('../../config/query.js')

const { getAllTransactions, updateTransactionAmount} = orderQueries

const services = {
  updateTransactionTotalDB: () => {
    return new Promsise((resolve, reject) => {
      pool.execute(updateTransactionAmount, [], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        return resolve({ message: `Successfully updated the transaction's total price`, result: result });
      })
    })
  },
  getTransactionsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllTransactions, [], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        return resolve({ message: 'Successfully get all the transactions', result: result });
      })
    })
  }


}

module.exports = services;