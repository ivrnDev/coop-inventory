const pool = require('../../config/database.js');
const { orderQueries } = require('../../config/query.js')

const { createCustomerQuery, createTransactionQuery, getAllTransactionsQuery, updateTransactionAmountQuery } = orderQueries

const services = {
  createCustomerDB: ({ customer_name, customer_phone, customer_email }) => {
    return new Promise((resolve, reject) => {
      const createCustomerQuery = 'INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)';
      pool.execute(createCustomerQuery, [customer_name, customer_phone, customer_email], (error, result) => {
        if (error) reject(error);
        const customer_id = result.insertId;
        const customer = {
          customer_id,
          customer_name,
          customer_phone,
          customer_email,
        };
        resolve(customer);
      })
    })
  },
  createTransactionDB: (customer_id) => {
    return new Promise((resolve, reject) => {
      const createTransactionQuery = 'INSERT INTO transactions (customer_id, transaction_amount) VALUES (?, 0)';
      pool.execute(createTransactionQuery, [customer_id], (error, result) => {
        if (error) reject(error);
        const transaction_id = result.insertId;
        const transaction = {
          transaction_id,
          customer_id,
          total_price: 0,
        };
        console.log(transaction)
        resolve(transaction);
      });
    });
  },
  createOrderDB: (transaction_id, product_id, variant_id, quantity) => {
    return new Promise((resolve, reject) => {
      try {
        const getPriceQuery = 'SELECT variant_price FROM variants WHERE product_id = ? AND variant_id = ?';
        pool.execute(getPriceQuery, [product_id, variant_id], (error, result) => {
          if (error) reject(error);
          if (result.length === 0) reject({ message: 'Variant not found' });
          const variant_price = result[0].variant_price;
          const order_price = variant_price * quantity;

          const createOrderQuery = 'INSERT INTO orders (transaction_id, product_id, variant_id, quantity, order_price) VALUES (?, ?, ?, ?, ?)';
          pool.execute(createOrderQuery, [transaction_id, product_id, variant_id, quantity, order_price], (error, result) => {
            if (error) reject(error);
            const order_id = result.insertId;
            console.log(result)
            resolve({ order_id, order_price });
          });
        })

      } catch (error) {
        reject(error);
      }
    })
  },


  // updateTransactionTotalDB: () => {
  //   return new Promsise((resolve, reject) => {
  //     pool.execute(updateTransactionAmountQuery, [], (error, result) => {
  //       if (error) return reject({ message: 'Internal Server Error', error: error });
  //       return resolve({ message: `Successfully updated the transaction's total price`, result: result });
  //     })
  //   })
  // },
  getTransactionsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllTransactionsQuery, [], (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) return resolve(null)
        return resolve(result);
      })
    })
  }


}

module.exports = services;