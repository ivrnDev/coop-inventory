const pool = require('../../config/database.js');
const {customerQueries} = require('../../config/query.js')

const {getCustomersQuery} = customerQueries;

const services = {

  getCustomersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getCustomersQuery, [], (error, result) => {
        if(error) return reject({message: "Internal Server Error", error: error});
        return resolve({message: "Successfully get all the customers", result: result})
      })
    })
  }
}

module.exports = services;