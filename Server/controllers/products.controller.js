const fs = require('fs').promises;
const { createProductAlbumDB, deleteAlbumByProductIdDB } = require('../services/albums.services');
const {
  createProductDB,
  createVariantsDB,
  createNewVariantsDB,
  getAllVariantsDB,
  getVariantByIdDB,
  getVariantByProductIdDB,
  deleteVariantsDB,
  updateProductsDB,
  getAllDeletedCategoryDB,
  deleteProductByIdDB,
  getAllProductsDB,
  getProductByIdDB,
  updateProductStocksDB,
  updateVariantStocksDB,
  updateProductSoldDB,
  getAllCategoryDB,
  getCategoryByIdDB,
  createNewCategoryDB,
  deleteCategoryByIdDB,
  updateCategoryByIdDB,
  updateProductImageDB,
  getProductByFeaturedDB,
  getDeletedProductsDB
} = require('../services/products.services')

module.exports = {
  createProduct: async (req, res) => {
    try {
      let imagePath;
      if (req.files.display_image) {
        imagePath = req.files.display_image[0].buffer;
      } else {
        const defaultImagePath = './public/default-image.jpg';
        try {
          imagePath = await fs.readFile(defaultImagePath);
        } catch (error) {
          return res.status(500).json({ message: "Error reading default image" });
        }
      };
      const { category_id, product_name, display_name, display_price, product_description, status, isFeatured, variants } = req.body;
      const parseVariants = JSON.parse(variants)

      if (parseVariants.length === 0) return res.status(400).json({ message: "Variant is required!" });

      const product_stocks = parseVariants.reduce((accumulator, variant) => accumulator + Number(variant.variant_stocks), 0)

      const createdProduct = await createProductDB(category_id, product_name, display_name, display_price, product_stocks, product_description, status, isFeatured, imagePath);
      if (createdProduct === 1) return res.status(400).json({ message: `${product_name} already exist` });
      if (!createdProduct) return res.status(400).json({ message: "Failed to insert product" });

      const { product_id } = createdProduct;
      const album = req.files.product_album

      if (album) {
        const createAlbum = await createProductAlbumDB(product_id, album);
        if (!createAlbum) return res.status(400).json({ error: "Failed to upload albums" })
      }

      const createdVariants = await createVariantsDB(product_id, parseVariants)
      if (!createdVariants) return res.status(400).json({ message: `Failed to insert variants in a product with an ID of ${product_id}` })

      const result = {
        product: createdProduct,
        variants: createdVariants,
      }
      return res.status(201).json({ message: "Successfully created a new product", result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const { category, active } = req.query
      const result = await getAllProductsDB(category, active);
      if (result === null) return res.status(404).json({ error: "There is no existing products" })
      return res.status(200).json({ message: "Successfully get all the products", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getAllActiveProducts: async (req, res) => {
    try {
      const { category } = req.query
      const result = await getAllProductsDB(category);
      if (result === null) return res.status(404).json({ error: "There is no existing products" })
      return res.status(200).json({ message: "Successfully get all active products", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getDeletedProducts: async (req, res) => {
    try {
      const result = await getDeletedProductsDB();
      if (result === null) return res.status(404).json({ error: "There is no existing products" })
      return res.status(200).json({ message: "Successfully get all the deleted products", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateProducts: async (req, res) => {
    try {
      let imagePath;
      if (req.files) {
        imagePath = req.files.display_image[0].buffer;
      } else {
        const defaultImagePath = './public/default-image.jpg';
        try {
          imagePath = await fs.readFile(defaultImagePath);
        } catch (error) {
          return res.status(500).json({ message: "Error reading default image" });
        }
      }

      const { category_id, display_name, display_price, product_description, status, isFeatured } = req.body
      const { id } = req.params

      const updatedProduct = await updateProductsDB(category_id, display_name, display_price, product_description, status, isFeatured, imagePath, id)
      if (updatedProduct === null) return res.status(404).json({ message: `There is no product with an ID of ${id}` });
      if (!updatedProduct) return res.status(400).json({ message: "Failed to update product" });

      const album = req.files.product_album

      if (!album) await deleteAlbumByProductIdDB(id);
      if (album) {
        const deleteAlbum = await deleteAlbumByProductIdDB(id);
        if (!deleteAlbum) return res.status(400).json({ error: "Failed to delete albums" })
        const createAlbum = await createProductAlbumDB(id, album);
        if (!createAlbum) return res.status(400).json({ error: "Failed to upload albums" })
      }


      const result = {
        product: updatedProduct,
      }

      return res.status(200).json({ message: `Successfully Updated the product with an ID of ${req.params.id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },

  createVariants: async (req, res) => {
    try {
      const { variants } = req.body;
      const updatedVariants = await createNewVariantsDB(req.params.id, variants);

      const result = {
        variants: updatedVariants
      }
      return res.status(201).json({ message: `Successfully created the variants with the product ID of ${req.params.id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },
  deleteVariants: async (req, res) => {
    const { product_id, variant_id } = req.query
    try {
      const deletedVariants = await deleteVariantsDB(product_id, variant_id);
      return res.status(200).json({ message: `Successfully delete variant with the product ID of ${product_id} and variant ID of ${variant_id}`, result: deletedVariants })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },
  deleteProductById: async (req, res) => {
    const { id } = req.params
    const { action } = req.query
    try {
      const result = await deleteProductByIdDB(id, action);
      if (result.length === null) return res.status(404).json({ error: `Product with an Id of ${id} has not found` })
      return res.status(200).json({ message: `Successfully get the product with an ID of ${id}`, result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getProductById: async (req, res) => {
    try {
      const result = await getProductByIdDB(req.params.id);
      if (!result || result.length === 0) return res.status(404).json({ error: `Product with an Id of ${req.params.id} has not found` })
      return res.status(200).json({ message: `Successfully get the product with an ID of ${req.params.id}`, result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateProductStocks: async (req, res) => {
    const { id } = req.params
    const { action, value } = req.query
    try {
      const getProductId = await getProductByIdDB(id)
      if (getProductId === null) return res.status(404).json({ error: `Product with an Id of ${id} has not found` })

      const result = await updateProductStocksDB(id, action, value);
      if (!result) return res.status(400).json({ error: `Failed to update the stock of product with ID of ${id}` })

      return res.status(200).json({ message: `Successfully updated the stock of product with ID of ${id}`, result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getAllVariants: async (req, res) => {
    try {
      const result = await getAllVariantsDB();
      if (!result) return res.status(400).json({ error: "Failed to get all variants" });
      if (result === null) res.status(200).json({ error: `There is no existing variants` });
      return res.status(200).json({ message: `Successfully get all variants`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }

  },
  getVariantById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getVariantByIdDB(id);
      if (result === null) return res.status(404).json({ error: `There is no existing variant with an ID of ${id}` })
      if (!result) return res.status(400).json({ error: `Failed to get variant with an ID of ${id}` });
      return res.status(201).json({ message: `Successfully get variant with an ID of ${id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getVariantByProductId: async (req, res) => {
    try {
      const { product_id } = req.query
      const result = await getVariantByProductIdDB(product_id);
      if (result === null) return res.status(200).json({ error: `There is no existing variant with an product ID of ${product_id}` })
      if (!result) return res.status(400).json({ error: `Failed to get variant with a product ID of ${product_id}` });

      return res.status(200).json({ message: `Successfully get variant with a product ID of ${product_id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateVariant: async (req, res) => {
    const { id } = req.params
    const variants = req.body.variants;
    if (variants.length === 0) return res.status(400).json({ message: "Variant is required!" });

    const product_stocks = variants.reduce((accumulator, variant) => accumulator + Number(variant.variant_stocks), 0)
    try {
      const updateProductStocks = await updateProductStocksDB(id, 'update', product_stocks);
      if (!updateProductStocks) return res.status(400).json({ message: `Failed to update product stocks to ${product_stocks}` })

      const updatedVariants = await createVariantsDB(id, variants);
      if (!updatedVariants) return res.status(400).json({ message: `Failed to update variants in a product with an ID of ${id}` })
      const result = {
        stocks: product_stocks,
        variants: variants
      }
      return res.status(200).json({ message: `Successfully updated the variant with product ID of ${id}`, result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateVariantStocks: async (req, res) => {
    const { id } = req.params
    const { action, value } = req.query
    try {

      const getVariantById = await getVariantById()
      if (getVariantById === null) return res.status(404).json({ error: `Variant with an Id of ${id} has not found` })
      const result = await updateVariantStocksDB(id, action, value);
      if (!result) return res.status(400).json({ error: `Failed to update the stock of variant with ID of ${id}` })
      return res.status(200).json({ message: `Successfully updated the stock of variant with ID of ${id}`, result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateProductSold: async (req, res) => {
    const { id } = req.params
    const { action, value } = req.query
    try {
      const result = await updateProductSoldDB(id, action, value);
      if (!result) return res.status(404).json({ error: `Failed to update the number of sold items in product with ID of ${id}` })
      if (result.length === 0) return res.status(404).json({ error: `Product with an Id of ${id} has not found` })
      return res.status(200).json({ message: `Successfully updated the number of sold items in product with ID of ${id}`, result: result });
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const result = await getAllCategoryDB()
      if (result === null) return res.status(404).json({ message: "There is no existing category" })
      if (!result) return res.status(400).json({ message: "Failed to get all category" })
      return res.status(200).json({ message: `Successfully get all category`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getCategoryByIdDB(id)
      if (result === null) return res.status(400).json({ error: `There is no existing category with an ID of ${id}` })
      return res.status(201).json({ message: `Successfully get category with an ID of ${id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getAllDeletedCategory: async (req, res) => {
    try {
      const result = await getAllDeletedCategoryDB()
      if (result === null) return res.status(400).json({ error: `There is no existing deleted category` })
      return res.status(201).json({ message: `Successfully get deleted category`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },

  createNewCategory: async (req, res) => {
    try {
      const { category_name } = req.body;
      const category_image = req.file.buffer;
      const result = await createNewCategoryDB(category_name, category_image);
      if (result === 1) return res.status(400).json({ message: `${category_name} already exist!` })
      if (!result) return res.status(400).json({ message: "Failed to create a new K" });
      return res.status(201).json({ message: `Successfully added new K ${category_name}` })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateCategoryById: async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;
    const category_image = req.file.buffer;

    try {
      const result = await updateCategoryByIdDB(category_name, category_image, id)
      if (result === 1) return res.status(400).json({ message: `${category_name} is already exist` })
      if (!result) return res.status(400).json({ message: `Failed to update K with an ID of ${id}` });
      return res.status(201).json({ message: `Successfully update K ID of ${id} to ${category_name}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  deleteCategoryById: async (req, res) => {
    const { id } = req.params;
    const { action } = req.query;
    try {
      const result = await deleteCategoryByIdDB(action, id)
      if (!result) return res.status(400).json({ message: `Failed to update isDeleted in category with an ID of ${id}` });
      return res.status(200).json({ message: `Successfully updated isDeleted category ID of ${id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateProductImage: async (req, res) => {
    try {
      let imagePath;
      if (req.file) {
        imagePath = req.file.buffer;
      } else {
        const defaultImagePath = './public/default-image.jpg';
        try {
          imagePath = await fs.readFile(defaultImagePath);
        } catch (error) {
          return res.status(500).json({ message: "Error reading default image" });
        }
      };
      const id = req.params.id
      const result = await updateProductImageDB(imagePath, id)
      if (!result) return res.status(400).json({ message: "Failed to update product image" });
      return res.status(200).json({ message: `Successfully update image with ID of ${id}` })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getProductByFeatured: async (req, res) => {
    try {
      const result = await getProductByFeaturedDB()
      if (result === null) return res.status(400).json({ error: `There is no featured products` })
      return res.status(201).json({ message: `Successfully get featured products`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },


}

