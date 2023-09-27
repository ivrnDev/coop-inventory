const pool = require('../db/database')
const { productQueries } = require('../db/dbQueries.js')
const {
  createProductQuery,
  createVariantQuery,
  updateProductQuery,
  updateVariantQuery,
  getAllProductsQuery,
  getProductByIdQuery,
  addProductStocksQuery,
  subtractProductStocksQuery,
  addVariantStocksQuery,
  subtractVariantStocksQuery,
  addProductSoldQuery,
  subtractProductSoldQuery
} = productQueries

module.exports = {
  //Create a new product information
  createProductDB: (product_name, display_name, display_price, product_stocks, product_description, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(createProductQuery,
        [product_name, display_name, display_price, product_stocks, product_description, imagePath],
        (error, result) => {
          if (error) return reject(error);
          const product_id = result.insertId;
          const product = {
            product_id: product_id,
            product_name: product_name,
            display_name: display_name,
            display_price: display_price,
            product_stocks: product_stocks,
            product_description: product_description,
            display_image: imagePath.toString('base64')
          }
          return resolve(product);
        }
      );
    })
  },
  //Create product variants and prices
  createVariantsDB: (product_id, variants) => {
    return new Promise((resolve, reject) => {
      variants.forEach((value, index) => {
        const { variant_name, variant_symbol, variant_price, variant_stocks } = value
        pool.execute(createVariantQuery, [index + 1, product_id, variant_name, variant_symbol, variant_price, variant_stocks], (error, result) => {
          if (error) return reject(error);

          return resolve(variants)
        })
      })
    })
  },
  //Update product details
  updateProductsDB: async (display_name, display_price, product_stocks, product_description, product_id, imagePath) => {
    return new Promise(async (resolve, reject) => {
      //Check if product with given ID exist
      const findProductByID = await module.exports.getProductByIdDB(product_id);
      if (findProductByID === null) resolve(null);

      //Update the product
      pool.execute(updateProductQuery, [
        display_name, display_price, product_stocks, product_description, imagePath, product_id
      ], (error, result) => {
        if (error) return reject(error)
        const updatedProduct = {
          product_id: product_id,
          display_name: display_name,
          display_price: display_price,
          product_stocks: product_stocks,
          product_description: product_description
        }
        return resolve(updatedProduct);
      })
    })
  },
  //Update Variants of product
  updateVariantsDB: (product_id, variants) => {
    return new Promise((resolve, reject) => {
      variants.forEach((value, index) => {
        const { variant_name, variant_symbol, variant_price, variant_stocks } = value;
        pool.execute(updateVariantQuery, [variant_name, variant_symbol, variant_price, variant_stocks, product_id, index + 1], (error, result) => {
          if (error) return reject(error)
          return resolve(variants)
        })
      })
    })
  },
  updateProductStocksDB: (product_id, operation, value) => {
    let updateProductStocksQuery;
    operation === 'add' ? updateProductStocksQuery = addProductStocksQuery : updateProductStocksQuery = subtractProductStocksQuery
    return new Promise((resolve, reject) => {
      pool.execute(updateProductStocksQuery, [value, product_id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
    })
  },
  updateVariantStocksDB: (id, operation, value) => {
    let updateVariantStocksQuery;
    operation === 'add' ? updateVariantStocksQuery = addVariantStocksQuery : updateVariantStocksQuery = subtractVariantStocksQuery
    return new Promise((resolve, reject) => {
      pool.execute(updateVariantStocksQuery, [value, id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
    })
  },
  updateProductSoldDB: (product_id, operation, value) => {
    let updateProductQuery;
    operation === 'add' ? updateProductQuery = addProductSoldQuery : updateProductQuery = subtractProductSoldQuery
    return new Promise((resolve, reject) => {
      pool.execute(updateProductQuery, [value, product_id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
    })
  },
  getAllProductsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllProductsQuery, [], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) {
          return resolve(null)
        } else {
          const products = result.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            display_name: product.display_name,
            display_price: product.display_price,
            product_stocks: product.product_stocks,
            product_description: product.product_description,
            display_image: product.display_image.toString('base64'),
          }))
          return resolve(products)
        }
      })
    })
  },
  getProductByIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductByIdQuery, [id], (error, result) => {
        if (error) return reject(error);
        if (result.length === 0) resolve(null)
        return resolve(result);
      })
    })
  },

};


