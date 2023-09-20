const pool = require('../../config/database.js')
const fs = require('fs');
const path = require('path');

const service = {
  createProduct: ({ name, price, stocks, variants }, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(
        'INSERT INTO products (name, price, stocks, variants, images) VALUES (?, ?, ?, ?, ?)',
        [name, price, stocks, variants, imagePath],
        (error, result) => {
          if (error) {
            return reject({ message: "Internal Server Error", error: error });
          }
          return resolve({ message: "Products has been created successfully", result: result });
        }
      );
    })
  },
  getProducts: () => {
    return new Promise((resolve, reject) => {
      pool.execute('SELECT * FROM products', [], (error, result) => {
        if (error) return reject({ message: "Internal Server Error", error: error })
        if (result.length === 0) {
          return reject({ message: "There is no existing products" })
        } else {
          return resolve({ message: "Successfully get all the products", result: result })
        }
      })
    })
  },
  updateProducts: async ({ name, price, stocks, variants }, id, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute('SELECT * FROM products WHERE id = ?', [id], (error, result) => {
        if (error) return reject({ message: "Internal Server Error", error: error })
        if (result.length === 0) return reject({ message: `There is no products with an ID of ${id}` })

        const image = result[0].images;

        pool.execute('UPDATE products SET name = ?, price = ?, stocks = ?, variants = ?, images = ? WHERE id = ?', [
          name, price, stocks, variants, imagePath, id
        ], (error, result) => {
          if (error) return reject({ message: "Failed to update data", error: error });
          if (image) {
            fs.unlink(`./images/${image}`, (err) => {
              if (err) {
                console.log('Error deleting file:', err);
              } else {
                console.log('File deleted successfully');
              }
            })
          }
          return resolve({ message: "Successfully Updated the data", result: result });
        })
      })

    })

  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute('SELECT images FROM products WHERE id = ?', [id], (error, results) => {
        if (error) return reject({ message: "Internal Server Error", error: error })
        if (results.length === 0) return reject(`There is no products with an ID of ${id}`);
        const image = results[0].images;
        pool.execute('DELETE FROM products WHERE id = ?', [id], (error, results) => {
          if (error) return reject({ message: "Internal Server Error", error: error })
          if (image) {
            fs.unlink(`./images/${image}`, (err) => {
              if (err) {
                console.log('Error deleting file:', err);
              } else {
                console.log('File deleted successfully');
              }
            });
          }
          return resolve(results)
        })
      })
    })
  }
};


bb
module.exports = service;
