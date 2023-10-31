const pool = require('../db/database')
const { productQueries } = require('../db/dbQueries.js')
const {
  createProductQuery,
  createVariantQuery,
  getAllVariantsQuery,
  updateVariantQuery,
  getVariantByIdQuery,
  getVariantByProductIdQuery,
  updateProductQuery,
  deleteVariantsQuery,
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
  getCategoryByNameQuery,
  createNewCategoryQuery,
  updateCategoryByIdQuery,
  updateProductImageQuery,
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
  updateProductsDB: async (category_id, display_name, display_price, product_stocks, product_description, status, isFeatured, product_id) => {
    return new Promise(async (resolve, reject) => {
      //Check if product with given ID exist
      const findProductByID = await module.exports.getProductByIdDB(product_id);
      if (findProductByID === null) resolve(null);

      //Update the product
      pool.execute(updateProductQuery, [category_id,
        display_name, display_price, product_stocks, product_description, status, isFeatured, product_id,
      ], (error, result) => {
        if (error) return reject(error)
        const updatedProduct = {
          product_id,
          display_name,
          display_price,
          product_stocks,
          product_description,
          status,
          isFeatured,
        }
        return resolve(updatedProduct);
      })
    })
  },
  //Create product variants and prices
  createVariantsDB: (product_id, variants) => {
    return new Promise((resolve, reject) => {
      variants.map((variant, index) => {
        const { variant_name, variant_symbol, variant_price, variant_stocks } = variant;
        pool.execute(createVariantQuery, [index + 1, product_id, variant_name, variant_symbol, variant_price, variant_stocks], (error, result) => {
          if (error) return reject(error);
          return resolve(variants)
        })
      })
    })
  },
  createNewVariantsDB: (product_id, variants) => {
    return new Promise((resolve, reject) => {
      variants.forEach(async (value, index) => {
        const checkVariant = await module.exports.getVariantByProductIdDB(product_id)
        let existingVariantId;
        if (checkVariant && checkVariant.length > 0) {
          existingVariantId = checkVariant.length
        } else {
          existingVariantId = 0
        }

        const { variant_name, variant_symbol, variant_price, variant_stocks } = value
        pool.execute(createVariantQuery, [existingVariantId + (index + 1), product_id, variant_name, variant_symbol, variant_price, variant_stocks], (error, result) => {
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
  getVariantByProductIdDB: (product_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getVariantByProductIdQuery, [product_id], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)
        return resolve(result)
      })
    })
  },
  updateVariantsDB: (product_id, variants) => {
    return new Promise((resolve, reject) => {
      variants.map((variant, index) => {
        const { variant_id, variant_name, variant_symbol, variant_price, variant_stocks } = variant;
        pool.execute(updateVariantQuery, [variant_name, variant_symbol, variant_price, variant_stocks, product_id, variant_id], (error, result) => {
          if (error) return reject(error)
          return resolve(variants)
        })
      })
    })
  },
  deleteVariantsDB: (product_id, variant_id) => {

    return new Promise((resolve, reject) => {
      pool.execute(deleteVariantsQuery, [product_id, variant_id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
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
            product_sold: product.product_sold,
            status: product.status,
            isFeatured: product.isFeatured,
            isDeleted: product.isDeleted,
            date_created: product.date_created,
            display_image: product.display_image.toString('base64'),
            category_id: product.category_id,
            category_name: product.category_name,
            category_image: product.category_image.toString('base64'),
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
          variant_id: product.variant_id,
          variant_name: product.variant_name,
          variant_symbol: product.variant_symbol,
          variant_price: product.variant_price,
          variant_stocks: product.variant_stocks,
          category_name: product.category_name,
          category_image: product.category_image.toString('base64')
        }))
        return resolve(products);
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
  getCategoryByNameDB: (name) => {
    return new Promise((resolve, reject) => {
      pool.execute(getCategoryByNameQuery, [name], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)
        return resolve(result)
      })
    })
  },
  createNewCategoryDB: (category_name, category_image) => {
    return new Promise(async (resolve, reject) => {
      const isExist = await module.exports.getCategoryByNameDB(category_name)
      if (isExist) return resolve(1)
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
  },
  updateProductImageDB: (image, product_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateProductImageQuery, [image, product_id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
    })
  }
};


