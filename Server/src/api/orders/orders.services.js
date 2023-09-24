const pool = require('../../config/database.js');
const { orderQueries, } = require('../../config/query.js')

const { createCustomerQuery, createTransactionQuery, createOrderQuery, getAllTransactionsQuery, updateTransactionAmountQuery, getPriceQuery } = orderQueries

const services = {
  createCustomerDB: ({ customer_name, customer_phone, customer_email }) => {
    return new Promise((resolve, reject) => {
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
  // getOrderPrice: ({ product_id, variant_id, quantity }) => {
  //   return new Promise((resolve, reject) => {
  //     pool.execute(getPriceQuery, [product_id, variant_id], (error, result) => {
  //       if (error) reject(error)
  //       if (result.length === 0) resolve(null)
  //       const variant_price = result[0].variant_price
  //       const order_total = variant_price * quantity
  //       console.log(order_total)
  //       return resolve(order_total);
  //     })
  //   })

  // },
  createOrderDB: (orderData, transaction_id) => {
    const getOrderPrice = (product_id, variant_id, quantity) => {
      return new Promise((resolve, reject) => {
        pool.execute(getPriceQuery, [product_id, variant_id], (error, result) => {
          if (error) reject(error)
          if (result.length === 0) resolve(null)
          const variant_price = result[0].variant_price
          const order_total = variant_price * quantity
          return resolve(order_total);
        })
      })

    }
    return new Promise(async (resolve, reject) => {
      try {
        for (const order of orderData) {
          const { product_id, variant_id, quantity } = order;

          const orderPrice = await getOrderPrice(product_id, variant_id, quantity);
          if(orderPrice === null) reject({error: "Item has not found"})

          pool.execute(createOrderQuery, [transaction_id, product_id, variant_id, quantity, orderPrice], (error, result) => {
            if (error) reject(error)
            const orders = {
              transaction_id: transaction_id,
              product_id: product_id,
              variant_id: variant_id,
              quantity: quantity,
              order_price: orderPrice
            }
            
            resolve(orders)
          });


        }




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