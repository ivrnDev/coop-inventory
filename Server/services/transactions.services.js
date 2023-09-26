const pool = require('../db/database')
const { transactionQueries } = require('../db/dbQueries.js')
const { createTransactionQuery, getAllTransactionsQuery, updateTransactionAmountQuery, updateTransactionStatusQuery, getTransactionByIdQuery } = transactionQueries;

module.exports = {
  //Create a new transaction
  createTransactionDB: (customer_id, payment_method) => {
    return new Promise((resolve, reject) => {
      pool.execute(createTransactionQuery, [customer_id, payment_method], (error, result) => {
        if (error) reject(error);
        const transaction_id = result.insertId;
        const transaction = {
          transaction_id,
          customer_id,
          total_price: 0,
        };
        resolve(transaction);
      });
    });
  },
  //Get all transactions
  getAllTransactionsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllTransactionsQuery, [], (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) return resolve(null)
        return resolve(result);
      })
    })
  },
  getTransactionByIdDB: (transaction_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getTransactionByIdQuery, [transaction_id], (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) return resolve(null)
        return resolve(result);
      })
    })
  },
  updateTransactionDB: (transaction_id, transaction_amount, transaction_status) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (transaction_amount) {
          await module.exports.updateTransactionAmountDB(transaction_id, transaction_amount);
          return resolve({ message: `Successfully set transaction amount to ${transaction_amount} with a transaction ID of ${transaction_id}` })
        }
        if (transaction_status) {
          await module.exports.updateTransactionStatusDB(transaction_id, transaction_status);
          return resolve({ message: `Successfully set transaction status to ${transaction_status} with a transaction ID of ${transaction_id}` })
        }
      } catch (error) {
        return reject(error)

      }

    })

  },

  //Update the total amount of transaction
  updateTransactionAmountDB: (transaction_id, transaction_amount) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateTransactionAmountQuery, [transaction_amount, transaction_id], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })
    })
  },

  //Update the transaction status
  updateTransactionStatusDB: (transaction_id, transaction_status) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateTransactionStatusQuery, [transaction_status, transaction_id], async (error, result) => {
        if (error) return reject(error);
        await module.exports.updateOrderStatusDB(transaction_id, transaction_status);
        return resolve(result)
      })
    })

  },

}