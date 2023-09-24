const pool = require('../../config/database.js')
const {productQueries} = require('../../config/query.js')
const {createProductQuery, getProductsQuery, updateProductsQuery} = productQueries

const service = {
  createProductDB: ({ name, price, stocks, variants }, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(createProductQuery,
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
  getProductsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductsQuery, [], (error, result) => {
        if (error) return reject({ message: "Internal Server Error", error: error })
        if (result.length === 0) {
          return reject({ message: "There is no existing products" })
        } else {
          const products = result.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            stocks: product.stocks,
            variants: product.variants,
            images: product.images && product.images.toString('base64'),
          }));
          return resolve({ message: "Successfully get all the products", result: products })
        }
      })
    }) 
  },
  updateProductsDB: async ({ name, price, stocks, variants }, id, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateProductsQuery, [id], (error, result) => {
        if (error) return reject({ message: "Internal Server Error", error: error })
        if (result.length === 0) return reject({ message: `There is no products with an ID of ${id}` })
        pool.execute('UPDATE products SET name = ?, price = ?, stocks = ?, variants = ?, images = ? WHERE product_id = ?', [
          name, price, stocks, variants, imagePath, id
        ], (error, result) => {
          if (error) return reject({ message: "Failed to update data", error: error });
          return resolve({ message: "Successfully Updated the data", result: result });
        })
      })

    })

  },
  // deleteProductDB: (id) => {
  //   return new Promise((resolve, reject) => {
  //     pool.execute('SELECT images FROM products WHERE id = ?', [id], (error, results) => {
  //       if (error) return reject({ message: "Internal Server Error", error: error })
  //       if (results.length === 0) return reject(`There is no products with an ID of ${id}`);
  //       pool.execute('DELETE FROM products WHERE id = ?', [id], (error, results) => {
  //         if (error) return reject({ message: "Internal Server Error", error: error })
  //         return resolve(results)
  //       })
  //     })
  //   })
  // }
};

module.exports = service;
