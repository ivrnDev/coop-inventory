const pool = require('../../config/database.js');
const { orderQueries } = require('../../config/query.js')

const { createCustomerQuery, createTransactionQuery, getAllTransactionsQuery, updateTransactionAmountQuery } = orderQueries

const services = {
  createCustomerDB: ({ customer_name, customer_phone, customer_email }) => {
    return new Promise((resolve, reject) => {
      pool.execute(createCustomerQuery, [customer_name, customer_phone, customer_email], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        return resolve({
          message: "Successfully created the customer", result: {
            name: customer_name,
            phone: customer_phone,
            email: customer_email,
            sqlMessage: result
          }
        })
      });
    })
  },
  createTransactionDB: (email) => {
    return new Promise((resolve, reject) => {
      pool.execute(createTransactionQuery, [email], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        return resolve({ message: `Successfully created a new transaction for customer ${email}`, result: result });
      })
    })
  },
 









  updateTransactionTotalDB: () => {
    return new Promsise((resolve, reject) => {
      pool.execute(updateTransactionAmountQuery, [], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        return resolve({ message: `Successfully updated the transaction's total price`, result: result });
      })
    })
  },
  getTransactionsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllTransactionsQuery, [], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        if (result.length === 0) return resolve({ message: "There is no records of transactions", result: result })
        return resolve({ message: 'Successfully get all the transactions', result: result });
      })
    })
  }


}

module.exports = services;