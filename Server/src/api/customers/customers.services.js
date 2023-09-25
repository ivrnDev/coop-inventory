const pool = require('../../config/database.js');
const {customerQueries} = require('../../config/query.js')
const {createCustomerQuery, getCustomersQuery} = customerQueries

module.exports = {
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
  getCustomersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getCustomersQuery, [], (error, result) => {
        if(error) return reject({message: "Internal Server Error", error: error});
        return resolve({message: "Successfully get all the customers", result: result})
      })
    })
  }
}
