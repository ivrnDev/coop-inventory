const pool = require("../../config/database.js");
const service = {
  createCustomer: ({name, phone, email}) => {
    return new Promise((resolve, reject) => {
      pool.execute('INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)', [name, phone, email], (error, result) => {
        if(error) return reject({message: 'Internal Server Error', error: error});
        return resolve({message: 'Successfully created customer', result: result});
      })
    })
  },
  getCustomers: () => {
    return new Promise((resolve, reject) => {
      pool.execute('SELECT * FROM customers', [], 
      (error, result) => {
        if(error) return reject({message: 'Internal Server Error', error: error});
        if(result.length === 0) return reject({message: 'There is no existing customer'})
        return resolve({message: 'Successfully get all customers', result: result});
      }) 
    })
  }
}

module.exports = service;