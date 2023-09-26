const pool = require('../db/database')
const { productQueries } = require('../db/dbQueries.js')
const {
  createProductQuery,
  createVariantQuery,
  createProductAlbumQuery,
  updateProductQuery,
  updateVariantQuery,
  getAllProductsQuery,
  getProductByIdQuery
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
            product_image: imagePath.toString('base64')
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
  //Create a product album
  createProductAlbumDB: (product_id, albums) => {
    return new Promise((resolve, reject) => {
      const albumData = albums.map(photo => ({
        buffer: photo.buffer.toString('base64')
      }))
      pool.execute(createProductAlbumQuery, [JSON.stringify(albumData), product_id], (error, result) => {
        if (error) return reject(error)
        return resolve(albumData)
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
  //Get all the products
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
            product_image: product.product_image.toString('base64'),
            product_albums: product.product_albums // image is already base 64
          }))
          return resolve(products)
        }
      })
    })
  },
  //Get products by ID
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


