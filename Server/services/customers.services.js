const pool = require('../db/database')
const { customerQueries } = require('../db/dbQueries.js')
const { createCustomerQuery, getCustomersQuery, getCustomerbyIdQuery, verifyCustomerQuery, } = customerQueries
module.exports = {
  createCustomerDB: (student_id, customer_name, customer_phone, customer_email) => {
    return new Promise(async (resolve, reject) => {
      const isVerified = await module.exports.verifyCustomerDB(student_id, customer_name, student_id);
      if (!isVerified) return resolve(null)
      pool.execute(createCustomerQuery, [student_id, customer_name, customer_phone,
        customer_email], (error, result) => {
          if (error) reject(error);
          const student_id = result.insertId;
          const customer = {
            student_id,
            customer_name,
            customer_phone,
            customer_email,
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
  verifyCustomerDB: (student_id, student_name) => {
    return new Promise((resolve, reject) => {
      pool.execute(verifyCustomerQuery, [student_name, student_name, student_id], (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) return resolve(null)
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
