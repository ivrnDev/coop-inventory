const pool = require('../../config/database.js');
const { receiptSelect, customers, updateTransactionAmount } = require('../../config/query.js')

const services = {
 
  createOrders: ({ customer_name, customer_phone, customer_email }) => {
    return new Promise((resolve, reject) => {
      pool.execute(customers, [customer_name, customer_phone, customer_email], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        console.log("Sucessfully Inserted Customer")
        pool.execute(receiptSelect, [], (error, result) => {
          if (error) return reject({ message: 'Internal Server Error', error: error });
          return resolve({ message: 'Successfully get an order', result: result });
        })
        pool.execute(updateTransactionAmount, [], (error, result) => {
          if (error) return reject({ message: 'Internal Server Error', error: error });
          return resolve({ message: 'Successfully get an order', result: result });
        })
      });
    })
  }


}

module.exports = services;