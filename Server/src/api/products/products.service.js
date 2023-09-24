const pool = require('../../config/database.js')
const { productQueries } = require('../../config/query.js')
const { createProductQuery, createVariantQuery, getProductsQuery, updateProductQuery, getProductByIdQuery } = productQueries

const service = {
  createProductDB: ({ product_name, display_price, product_stocks, product_description }, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(createProductQuery,
        [product_name, display_price, product_stocks, product_description, imagePath],
        (error, result) => {
          if (error) return reject(error);
          const product_id = result.insertId;
          const product = {
            product_id,
            product_name,
            display_price,
            product_stocks,
            product_description
          }
          return resolve({ message: "Successfully added new product", product });
        }
      );
    })
  },
  getProductsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductsQuery, [], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) {
          return resolve(null)
        } else {
          const products = result.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            display_price: product.display_price,
            product_stocks: product.product_stocks,
            product_description: product.product_description,
            product_images: product.product_image.toString('base64'),
          }));
          return resolve(products)
        }
      })
    })
  },
  createVariantsDB: (product_id, variants) => {
    return new Promise((resolve, reject) => {
      variants.forEach((value, index) => {
        const { variant_name, variant_symbol, variant_price } = value
        pool.execute(createVariantQuery, [index + 1, product_id, variant_name, variant_symbol, variant_price], (error, result) => {
          if (error) return reject(error);
          return resolve({ message: `Successfully added new variants`, variants })
        })

      })

   
    })

  },
  updateProductsDB: async ({ product_name, display_price, product_stocks, product_description }, id, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductByIdQuery, [id], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)

        pool.execute(updateProductQuery, [
          product_name, display_price, product_stocks, product_description, imagePath, id
        ], (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        })
      })

    })

  },
  getProductByIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductByIdQuery, [id], (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      })
    })
  }
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
