const pool = require('../db/database')
const { transactionQueries, orderQueries } = require('../db/dbQueries.js')
const { createTransactionQuery, getAllTransactionsQuery, updateTransactionAmountQuery, updateTransactionStatusQuery, getTransactionByIdQuery } = transactionQueries;
const { updateOrderStatusByIDQuery, updateOrderStatusByTransactionIDQuery } = orderQueries

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
  // updateTransactionDB: (transaction_id, transaction_amount, transaction_status) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = transaction_amount
  //         ? await module.exports.updateTransactionAmountDB(transaction_id, transaction_amount)
  //         : transaction_status
  //           ? await module.exports.updateTransactionStatusDB(transaction_id, transaction_status)
  //           : null;

  //       return resolve(result)
  //     } catch (error) {
  //       return reject(error)
  //     }
  //   })

  // },
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