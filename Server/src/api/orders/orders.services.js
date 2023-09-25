const pool = require('../../config/database.js');
const { orderQueries } = require('../../config/query.js');
const { updateTransactionAmount } = require('../transactions/transactions.services.js');
const { createOrderQuery, getPriceQuery, getAllOrdersQuery } = orderQueries;

module.exports = {
  createOrderDB: (orderData, transaction_id) => {
    let total_transaction = 0;
    const getOrderPrice = (product_id, variant_id, quantity) => {
      return new Promise((resolve, reject) => {
        pool.execute(getPriceQuery, [product_id, variant_id], (error, result) => {
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
    };
    return new Promise(async (resolve, reject) => {
      try {
        for (const order of orderData) {
          const { product_id, variant_id, quantity } = order;
          const orderPrice = await getOrderPrice(product_id, variant_id, quantity);
          if (orderPrice === null) reject({ error: "Item has not found" })
          const { order_total, variant_name } = orderPrice
          total_transaction += order_total

          //Update Transaction Total Amount
          await updateTransactionAmount(total_transaction, transaction_id)

          pool.execute(createOrderQuery, [transaction_id, product_id, variant_name, quantity, order_total], async (error, result) => {
            if (error) reject(error)
            return resolve(result)
          });
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  getAllOrdersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllOrdersQuery, [], (error, result) => {
        if (error) return reject(error);
        if(result.length == 0) return resolve(null)
        return resolve(result)
      })
    })
  }
}
