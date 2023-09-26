const pool = require('../../config/database.js')
const { productQueries } = require('../../config/query.js')
const {
  createProductQuery,
  createVariantQuery,
  uploadProductAlbumQuery,
  updateProductQuery,
  updateVariantQuery,
  getProductsQuery,
  getProductByIdQuery
} = productQueries

module.exports = {
  createProductDB: ({ product_name, display_name, display_price, product_stocks, product_description }, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(createProductQuery,
        [product_name, display_name, display_price, product_stocks, product_description, imagePath],
        (error, result) => {
          if (error) return reject(error);
          const product_id = result.insertId;
          const product = {
            product_id,
            product_name,
            display_name,
            display_price,
            product_stocks,
            product_description
          }
          return resolve({ message: "Successfully added a new product", product });
        }
      );
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
  uploadProductAlbumDB: (albums, product_id) => {
    return new Promise(async (resolve, reject) => {
      const albumData = albums.map(photo => ({
        buffer: photo.buffer.toString('base64')
      }))
      pool.execute(uploadProductAlbumQuery, [JSON.stringify(albumData), product_id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })

    })

  },

  updateProductsDB: async ({ display_name, display_price, product_stocks, product_description }, id, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductByIdQuery, [id], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)

        pool.execute(updateProductQuery, [
          display_name, display_price, product_stocks, product_description, imagePath, id
        ], (error, result) => {
          if (error) return reject(error)
          const updatedProduct = {
            product_id: id,
            display_name: display_name,
            display_price: display_price,
            product_stocks: product_stocks,
            product_description: product_description
          }
          return resolve(updatedProduct);
        })
      })
    })
  },
  updateVariantsDB: (product_id, variants) => {
    return new Promise((resolve, reject) => {
      variants.forEach((value, index) => {
        const { variant_name, variant_symbol, variant_price } = value;
        pool.execute(updateVariantQuery, [variant_name, variant_symbol, variant_price, product_id, index + 1], (error, result) => {
          if (error) return reject(error)
          return resolve({ message: `Succesfully updated a ${variant_name} variant in product ID ${product_id}`, variants })
        })
      })

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
            display_name: product.display_name,
            display_price: product.display_price,
            product_stocks: product.product_stocks,
            product_description: product.product_description,
            product_image: product.product_image.toString('base64'),
            product_albums: product.product_albums
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
        return resolve(result);
      })
    })
  },


};

