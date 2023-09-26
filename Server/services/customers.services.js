const pool = require('../db/database')
const {customerQueries} = require('../db/dbQueries.js')
const {createCustomerQuery, getCustomersQuery} = customerQueries

module.exports = {
  //Create a new Customer
  createCustomerDB: (customer_name, customer_phone, customer_email) => {
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
  //Get all the list of customers
  getCustomersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getCustomersQuery, [], (error, result) => {
        if(error) return reject({message: "Internal Server Error", error: error});
        return resolve({message: "Successfully get all the customers", result: result})
      })
    })
  }
}
