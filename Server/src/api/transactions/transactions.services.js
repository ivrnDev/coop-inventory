const pool = require('../../config/database.js');
const { transactionQueries } = require('../../config/query.js')
const { createTransactionQuery, getAllTransactionsQuery, updateTransactionAmountQuery, updateTransactionStatusQuery } = transactionQueries;

module.exports = {
  createTransactionDB: (customer_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(createTransactionQuery, [customer_id], (error, result) => {
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
  getAllTransactionsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllTransactionsQuery, [], (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) return resolve(null)
        return resolve(result);
      })
    })
  },
  updateTransactionAmount: (total_transaction, transaction_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateTransactionAmountQuery, [total_transaction, transaction_id], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })
    })
  },



  updateOrderStatusDB: (transaction_id, transaction_status, order_id, order_status) => {
    return new Promise((resolve, reject) => {
      let id;
      let status;
      let target;

      if(transaction_status === 'cancelled') {
        id = transaction_id;
        status = 'cancelled'
        target = 'transaction_id'
      } else if (transaction_status === 'completed') {
        id = transaction_id;
        status = 'paid'
        target = 'transaction_id'
      } else if (transaction_status === 'pending') {
        id = transaction_id;
        status = 'unpaid'
        target = 'transaction_id'
      } else {
        id = order_id;
        status = order_status
        target = 'id'
      }

      const updateOrderStatusQuery = `UPDATE orders SET order_status = '${status}' WHERE ${target} = ${id}`;
      pool.execute(updateOrderStatusQuery, [], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })
    })
  },
  updateTransactionStatusDB: (transaction_id, transaction_status) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateTransactionStatusQuery, [transaction_status, transaction_id], async (error, result) => {
        if (error) return reject(error);
        await module.exports.updateOrderStatusDB(transaction_id, transaction_status);
        return resolve(result)
      })
    })

  }

}