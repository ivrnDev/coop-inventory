const pool = require('../db/database')
const { productQueries } = require('../db/dbQueries.js')
const {
  createProductQuery,
  createVariantQuery,
  getAllVariantsQuery,
  updateVariantQuery,
  getVariantByIdQuery,
  updateProductQuery,
  getAllProductsQuery,
  getProductByIdQuery,
  addProductStocksQuery,
  subtractProductStocksQuery,
  addVariantStocksQuery,
  subtractVariantStocksQuery,
  addProductSoldQuery,
  subtractProductSoldQuery,
  getAllCategoryQuery,
  getCategoryByIdQuery,
  createNewCategoryQuery,
  updateCategoryByIdQuery,
} = productQueries

module.exports = {
  //Create a new product information
  createProductDB: (category_id, product_name, display_name, display_price, product_stocks, product_description, imagePath) => {
    return new Promise((resolve, reject) => {
      pool.execute(createProductQuery,
        [category_id, product_name, display_name, display_price, product_stocks, product_description, imagePath],
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
            display_image: imagePath.toString('base64'),

          }
          return resolve(product);
        }
      );
    })
  },
  //Update products
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
  getAllVariantsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllVariantsQuery, [], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)
        return resolve(result)
      })
    })
  },
  getVariantByIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getVariantByIdQuery, [id], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)
        return resolve(result)
      })
    })
  },
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
            category_id: product.category_id,
            product_id: product.product_id,
            product_name: product.product_name,
            display_name: product.display_name,
            display_price: product.display_price,
            product_stocks: product.product_stocks,
            product_description: product.product_description,
            product_sold: product.product_sold,
            status: product.status,
            isFeatured: product.isFeatured,
            isDeleted: product.isDeleted,
            date_created: product.date_created,
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
  getAllCategoryDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllCategoryQuery, [], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)
        const categories = result.map(category => ({
          category_id: category.category_id,
          category_name: category.category_name,
          category_image: category.category_image.toString('base64')
        }))
        return resolve(categories)
      })
    })
  },
  getCategoryByIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getCategoryByIdQuery, [id], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)
        const categories = result.map(category => ({
          category_id: category.category_id,
          category_name: category.category_name,
          category_image: category.category_image.toString('base64')
        }))
        return resolve(categories)
      })
    })
  },
  createNewCategoryDB: (category_name, category_image) => {
    return new Promise((resolve, reject) => {
      pool.execute(createNewCategoryQuery, [category_name, category_image], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
    })
  },
  updateCategoryByIdDB: (category_name, category_image, id) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateCategoryByIdQuery, [category_name, category_image, id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
    })
  }
};


