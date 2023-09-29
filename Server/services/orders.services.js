const pool = require('../db/database')
const { orderQueries } = require('../db/dbQueries.js');
const {
  createOrderQuery,
  getVariantPriceQuery,
  getAllOrdersQuery,
  getOrderbyIdQuery,
  getOrderbyTransactionIdQuery,
} = orderQueries;
const { updateTransactionAmountDB, getTransactionByIdDB } = require('./transactions.services');

module.exports = {
  createOrderDB: (transaction_id, order_data) => {
    return new Promise(async (resolve, reject) => {

      let total_transaction_amount = 0;
      for (const order of order_data) {
        const { product_id, variant_id, quantity } = order;

        // Get Total Price of each order
        const orderPrice = await module.exports.getVariantPriceDB(product_id, variant_id, quantity);
        if (orderPrice === null) reject({ error: "Item has not been found, order is invalid" });

        // Update Transaction Total Amount
        const { order_total, variant_name } = orderPrice;
        total_transaction_amount += order_total;

        const checkPaymentMethod = await getTransactionByIdDB(transaction_id);
        const paymentMethod = checkPaymentMethod[0].payment_method

        const setPayment = paymentMethod === 'cash' ? "unpaid" : "paid"
        pool.execute(createOrderQuery, [transaction_id, product_id, variant_name, quantity, order_total, setPayment], async (error, result) => {
          if (error) reject(error);
          await updateTransactionAmountDB(transaction_id, total_transaction_amount);
          resolve(result); 
        });
      }
    })
  },
  getAllOrdersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllOrdersQuery, [], (error, result) => {
        if (error) return reject(error);
        if (result.length == 0) return resolve(null)
        return resolve(result)
      })
    })
  },
  getOrderbyTransactionIdDB: (transaction_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getOrderbyTransactionIdQuery, [transaction_id], (error, result) => {
        if (error) return reject(error);
        if (result.length == 0) return resolve(null)
        return resolve(result)
      })
    })
  },
  getOrderbyIdDB: (order_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getOrderbyIdQuery, [order_id], (error, result) => {
        if (error) return reject(error);
        if (result.length == 0) return resolve(null)
        return resolve(result)
      })
    })
  },
  //Get the total Price of orders according to its variant
  getVariantPriceDB: (product_id, variant_id, quantity) => {
    return new Promise((resolve, reject) => {
      pool.execute(getVariantPriceQuery, [product_id, variant_id], (error, result) => {
        if (error) reject(error)
        if (result.length === 0) {
          resolve(null)
        } else {
          const variant_price = result[0].variant_price;
          const variant_name = result[0].variant_name;
          const order_total = variant_price * quantity
          return resolve({ order_total, variant_name });
        }
      })
    })
  },

}
