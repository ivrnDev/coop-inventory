const pool = require('../../config/database.js');
const { customerQueries } = require('../../config/query.js')

const { createCustomer, getCustomers } = customerQueries

const services = {
  createCustomerDB: ({ customer_name, customer_phone, customer_email }) => {
    return new Promise((resolve, reject) => {
      pool.execute(createCustomer, [customer_name, customer_phone, customer_email], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        return resolve({ message: "Successfully created the customer", result: result })
      });
    })
  },
  getCustomersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getCustomers, [], (error, result) => {
        if (error) return reject({ message: 'Internal Server Error', error: error });
        if(result.length === 0) resolve({message: "There is no existing customers"})
        return resolve({ message: "Sucessfully get all the customers", result: result })
      })
    })
  },
}

module.exports = services;