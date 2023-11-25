const pool = require('../db/database')
const { customerQueries } = require('../db/dbQueries.js')
const { createCustomerQuery, getCustomersQuery, getCustomerbyIdQuery, verifyCustomerQuery, } = customerQueries
module.exports = {
  createCustomerDB: (transaction_id, student_id, student_phone) => {
    return new Promise(async (resolve, reject) => {
      pool.execute(createCustomerQuery, [transaction_id, student_id, student_phone], (error, result) => {
        if (error) reject(error);
        const customer = {
          transaction_id,
          student_id,
        };
        resolve(customer);
      })
    })
  },
  getCustomersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getCustomersQuery, [], (error, result) => {
        if (error) return reject(error);
        return resolve(result)
      })
    })
  },
  verifyCustomerDB: (student_id, student_name, student_email) => {
    return new Promise((resolve, reject) => {
      pool.execute(verifyCustomerQuery, [student_name, student_name, student_id, student_email, student_id], (error, result) => {
        if (error) return reject(error);
        if (result[0]?.verified === 0) return resolve(null)
        return resolve(result)
      })
    })
  },
  getCustomerbyIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getCustomerbyIdQuery, [id], (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) return resolve(null)
        return resolve(result)
      })
    })
  }
}
