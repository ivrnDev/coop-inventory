const pool = require('../db/database')
const { orderQueries } = require('../db/dbQueries.js');
const { createOrderQuery, getVariantPriceQuery, getAllOrdersQuery, getOrderbyIdQuery, getOrderbyTransactionIdQuery } = orderQueries;
const { updateTransactionDB } = require('./transactions.services');

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

        pool.execute(createOrderQuery, [transaction_id, product_id, variant_name, quantity, order_total], async (error, result) => {
          if (error) reject(error);
          await updateTransactionDB(transaction_id, total_transaction_amount);
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
  updateOrderStatusDB: (transaction_id, transaction_status, order_id, order_status) => {
    return new Promise((resolve, reject) => {
      let id;
      let status;
      let target;

      if (transaction_status === 'cancelled') {
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
}
