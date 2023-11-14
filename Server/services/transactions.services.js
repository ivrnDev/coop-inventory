const pool = require('../db/database')
const { transactionQueries } = require('../db/dbQueries.js');
const { updateVariantStocksDB } = require('./products.services.js');
const { createTransactionQuery, getAllTransactionsQuery, updateTransactionAmountQuery, updateTransactionStatusQuery, getTransactionByIdQuery, getAllFilteredTransactionsQuery } = transactionQueries;

module.exports = {
  createTransactionDB: (student_id, payment_method, reference_number, pickup_date) => {
    return new Promise((resolve, reject) => {
      pool.execute(createTransactionQuery, [student_id, payment_method, reference_number || null, pickup_date], (error, result) => {
        if (error) reject(error);
        const transaction_id = result.insertId;
        const transaction = {
          transaction_id,
          student_id,
          total_price: 0,
          reference_number
        };
        resolve(transaction);
      });
    });
  },
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

  updateTransactionAmountDB: (transaction_id, transaction_amount) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateTransactionAmountQuery, [transaction_amount, transaction_id], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })
    })
  },
  updateTransactionStatusDB: (transaction_id, transaction_status, action, orders) => {
    return new Promise(async (resolve, reject) => {
      if (transaction_status !== 'pending' && action) {
        for (const order of orders) {
          const { variant_name, order_quantity, product_id } = order
          const updateStocks = await updateVariantStocksDB(variant_name, product_id, action, order_quantity);
          if (!updateStocks || updateStocks === null) return reject(error)
        }
      }
      pool.execute(updateTransactionStatusQuery, [transaction_status, transaction_id], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })
    })
  },
}