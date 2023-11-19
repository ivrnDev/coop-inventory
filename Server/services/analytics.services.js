const pool = require('../db/database');
const { analyticsQueries } = require('../db/dbQueries')
const { getOrdersDetailStatus, getProductSalesQuery, salesQuery } = analyticsQueries
const getSales = require('../lib/getSales')
module.exports = {
  getOrderAnalyticsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getOrdersDetailStatus, [], (error, result) => {
        if (error) reject(error);
        if (result.length === 0) resolve(null);
        return resolve(result);
      })
    })
  },
  getProductSalesDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductSalesQuery, [], (error, result) => {
        if (error) reject(error);
        if (result.length === 0) resolve(null);
        return resolve(result);
      })
    })
  },
  salesDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(salesQuery, [], (error, result) => {
        if (error) reject(error);
        if(!result || result.length === 0) return resolve(null)
        const sales = getSales(result)
        return resolve(sales);
      })
    })
  },
}