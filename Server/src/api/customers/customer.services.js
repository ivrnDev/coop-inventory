const pool = require('../../config/database.js');
const { customerQueries } = require('../../config/query.js')

const { getCustomers } = customerQueries

const services = {
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