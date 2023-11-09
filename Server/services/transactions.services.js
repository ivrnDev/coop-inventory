const pool = require('../db/database')
const { transactionQueries, orderQueries } = require('../db/dbQueries.js')
const { createTransactionQuery, getAllTransactionsQuery, updateTransactionAmountQuery, updateTransactionStatusQuery, getTransactionByIdQuery, getAllFilteredTransactionsQuery } = transactionQueries;
const { updateOrderStatusByIDQuery, updateOrderStatusByTransactionIDQuery } = orderQueries

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
  getAllFilteredTransactionsDB: async (filter) => {
    if (filter !== 'all') {
      return new Promise((resolve, reject) => {
        pool.execute(getAllFilteredTransactionsQuery, [filter], (error, result) => {
          if (error) return reject(error);
          if (result.length === 0) return resolve(null)
          return resolve(result);
        })
      })
    } else {
      return await module.exports.getAllTransactionsDB();
    }

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
  updateTransactionStatusDB: (transaction_id, transaction_status) => {

    return new Promise(async (resolve, reject) => {
      let status;
      status = (transaction_status === 'completed') ? 'paid' : (transaction_status === 'pending') ? 'pending' : 'cancelled';
      await module.exports.updateOrderStatusDB(null, null, transaction_id, status); //Update all
      pool.execute(updateTransactionStatusQuery, [transaction_status, transaction_id], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })
    })



  },
  updateOrderStatusDB: (order_id, order_status, transaction_id, setAllStatus) => {
    const id = order_id || transaction_id;
    const status = order_id ? order_status : setAllStatus;
    const query = order_id ? updateOrderStatusByIDQuery : updateOrderStatusByTransactionIDQuery;
    return new Promise((resolve, reject) => {
      pool.execute(query, [status, id], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })

    })

  }

}