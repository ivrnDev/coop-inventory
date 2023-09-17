const pool = require('../config/database.js') 

const service = {
  createProduct: (data, callback) => {
    pool.query(
      'INSERT INTO products (name, price, stocks) VALUES (?, ?, ?)',
      [data.name, data.price, data.stocks],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getProducts: (callback) => {
    pool.query('SELECT * FROM products', [], (error, results) => {
      if(error) return callback(error)
      return callback(null, results)
    })

  },
  // getProductDetails: (search, ) => {
  //   pool.query(`SELECT * FROM products where ${data} = ${value}"`, [], (error, results) => {
  //     if(error) return callback(error)
  //     return callback(results)
  //   })
  // }

};

module.exports = service;
