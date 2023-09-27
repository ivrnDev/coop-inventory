const pool = require('../db/database')
const { orderQueries } = require('../db/dbQueries.js');
const { createOrderQuery, getVariantPriceQuery, getAllOrdersQuery, getOrderByIdQuery } = orderQueries;
const { updateTransactionDB } = require('./transactions.services');

module.exports = {
  createOrderDB: (transaction_id, order_data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let total_transaction_amount = 0; 
        for (const order of order_data) {
          const { product_id, variant_id, quantity } = order;

          // Get Total Price of each order
          const orderPrice = await module.exports.getOrderPriceDB(product_id, variant_id, quantity);
          if (orderPrice === null) reject({ error: "Item has not been found, order is invalid" });

          // Update Transaction Total Amount
          const { order_total, variant_name } = orderPrice;
          total_transaction_amount += order_total;
        }

        // Create a new order in one transaction ID
        const createOrderPromises = order_data.map(async (order) => {
          const { product_id, variant_id, quantity } = order;
          const orderPrice = await module.exports.getOrderPriceDB(product_id, variant_id, quantity);
          const { order_total, variant_name } = orderPrice;

          return new Promise((resolve, reject) => {
            pool.execute(createOrderQuery, [transaction_id, product_id, variant_name, quantity, order_total], (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          });
        });

        await Promise.all(createOrderPromises);

        // Update Transaction Total Amount after creating all orders
        await updateTransactionDB(transaction_id, total_transaction_amount);

        // Fetch the final order details
        const order = await module.exports.getOrderbyIdDB(null, transaction_id);

        resolve(order);
      } catch (error) {
        reject(error);
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
  getOrderbyIdDB: (order_id, transaction_id) => {
    let id;
    let target;
    if (order_id) {
      id = order_id;
      target = "id"
    } else {
      id = transaction_id;
      target = "transaction_id"

    }
    return new Promise(async (resolve, reject) => {
      const orderQuery = await getOrderByIdQuery(id, target)
      // console.log(orderQuery)
      pool.execute(orderQuery, [], (error, result) => {
        if (error) return reject(error);
        if (result.length == 0) return resolve(null)
        return resolve(result)
      })
    })

  },
  //Get the total Price of orders according to its variant
  getOrderPriceDB: (product_id, variant_id, quantity) => {
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
