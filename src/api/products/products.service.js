const pool = require('../../config/database.js')
const fs = require('fs');
const path = require('path');

const service = {
  createProduct: ({ name, price, stocks, imagePath }, callback) => {
    pool.execute(
      'INSERT INTO products (name, price, stocks, images) VALUES (?, ?, ?, ?)',
      [name, price, stocks, imagePath],
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
    pool.execute('SELECT images FROM products WHERE id = ?', [id], (error, results) => {
      if (error) return callback(error)
      if (results.length === 0) return callback(`There is no products with an ID of ${id}`);

      const imagePath = results[0].images;
  
      
        pool.execute('DELETE FROM products WHERE id = ?', [id], (error, results) => {
          if (error) return callback(error)
          if (imagePath) {
            // const filePath = path.join(__dirname, 'images', imagePath);
            fs.unlink(`./images/${imagePath}`, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              } else {
                console.log('File deleted successfully');
              }
            });
          }
        
        return callback(null, results)
      })
    })

  }
};

module.exports = service;
