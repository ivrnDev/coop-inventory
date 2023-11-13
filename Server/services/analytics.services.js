const pool = require('../db/database');
const { analyticsQueries } = require('../db/dbQueries')
const { getOrdersDetailStatus } = analyticsQueries
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
}