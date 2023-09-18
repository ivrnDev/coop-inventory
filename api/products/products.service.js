const pool = require('../../config/database.js')

const service = {
  createProduct: (data, callback) => {
    pool.execute(
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
    pool.execute('SELECT * FROM products', [], (error, results) => {
      if (error) return callback(error)
      if (results.length === 0) {
        return callback(null, { message: "There is no existing products" })
      } else {
        return callback(null, { message: "Successfully get all the data", data: results })
      }

    })
  },
  updateProducts: (data, id, callback) => {
    pool.execute('SELECT * FROM products WHERE id = ?', [id], (error, row) => {
      if (error) return callback(error)
      if (row.length === 0) return callback(`There is no products with an ID of ${id}`)
      pool.execute('UPDATE products SET name = ?, price = ?, stocks =? WHERE id = ?', [
        data.name, data.price, data.stocks, id
      ], (error, results) => {
        if (error) return callback(error);
        return callback(null, results);
      })
    })
  },
  deleteProduct: (id, callback) => {
    pool.execute('SELECT * FROM products WHERE id = ?', [id], (error, row) => {
      if (error) return callback(error)
      if (row.length === 0) return callback(`There is no products with an ID of ${id}`);
      pool.execute('DELETE FROM products WHERE id = ?', [id], (error, row) => {
        if (error) return callback(error)
        return callback(null, row)
      })


    })





  }
};

module.exports = service;
