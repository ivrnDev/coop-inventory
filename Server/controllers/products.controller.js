const fs = require('fs').promises;
const {
  createProductDB,
  createVariantsDB,
  getAllVariantsDB,
  getVariantByIdDB,
  updateProductsDB,
  updateVariantsDB,
  getAllProductsDB,
  getProductByIdDB,
  updateProductStocksDB,
  updateVariantStocksDB,
  updateProductSoldDB,
  getAllCategoryDB,
  getCategoryByIdDB,
  createNewCategoryDB,
  updateCategoryByIdDB,
} = require('../services/products.services')

module.exports = {
  //Create new product
  createProduct: async (req, res) => {
    try {
      //Check if there is an image
      let imagePath;
      if (req.file) {
        imagePath = req.file.buffer;
      } else {
        const defaultImagePath = './public/default-image.jpg';
        try {
          imagePath = await fs.readFile(defaultImagePath); //Read image as buffer
        } catch (error) {
          return res.status(500).json({ message: "Error reading default image" });
        }
      };

      //Get requested product
      const { category_id, product_name, display_name, display_price, product_stocks, product_description } = req.body;

      //Create Product
      const createdProduct = await createProductDB(category_id, product_name, display_name, display_price, product_stocks, product_description, imagePath);

      if (!createdProduct) return res.status(400).json({ message: "Failed to insert product" });

      //Get the id of newly created product
      const { product_id } = createdProduct;
      //Get requested variant
      const { variant_name, variant_symbol, variant_price, variant_stocks } = req.body;
      //Loop through variant and return an array of variants
      const variants = variant_name.map((name, index) => ({
        variant_name: name,
        variant_symbol: variant_symbol[index],
        variant_price: variant_price[index],
        variant_stocks: variant_stocks[index],
      }));
      //Create Variants
      const createdVariants = await createVariantsDB(product_id, variants)
      if (!createdVariants) return res.status(400).json({ message: `Failed to insert variants in a product with an ID of ${product_id}` })

      const result = {
        product: createdProduct,
        variants: createdVariants
      }
      return res.status(201).json({ message: "Successfully created a new product", result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },
  //Get all products list
  getAllProducts: async (req, res) => {
    try {
      const result = await getAllProductsDB();
      if (result === null) return res.status(404).json({ error: "There is no existing products" })
      return res.status(200).json({ message: "Successfully get all the products", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  //Update product by ID
  updateProducts: async (req, res) => {
    try {
      let imagePath;
      //Check if there is an image
      if (req.file) {
        imagePath = req.file.buffer;
      } else {
        const defaultImagePath = './public/default-image.jpg';
        try {
          imagePath = await fs.readFile(defaultImagePath); // Read default image as buffer
        } catch (error) {
          return res.status(500).json({ message: "Error reading default image" });
        }
      };

      //Get requested product
      const { display_name, display_price, product_stocks, product_description } = req.body

      //Update product
      const updatedProduct = await updateProductsDB(display_name, display_price, product_stocks, product_description, req.params.id, imagePath)
      if (updatedProduct === null) return res.status(404).json({ message: `There is no product with an ID of ${req.params.id}` });
      if (!updatedProduct) return res.status(400).json({ message: "Failed to update product" });

      //Update variant
      const { variant_name, variant_symbol, variant_price, variant_stocks } = req.body;
      const variant = variant_name.map((name, index) => ({
        variant_name: name,
        variant_symbol: variant_symbol[index],
        variant_price: variant_price[index],
        variant_stocks: variant_stocks[index]
      }))

      const updatedVariants = await updateVariantsDB(req.params.id, variant);


      const result = {
        product: updatedProduct,
        variants: updatedVariants
      }

      return res.status(200).json({ message: `Successfully Updated the product with an ID of ${req.params.id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },
  //Get Product by Id
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
      return res.status(201).json({ message: `Successfully get all variants`, result: result })
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
      if (!result) return res.status(400).json({ error: "Failed to get all category" })
      if (result === null) return res.status(404).json({ error: "There is no existing category" })
      return res.status(201).json({ message: `Successfully get all category`, result: result })
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

  createNewCategory: async (req, res) => {
    try {
      const { category_name } = req.body;
      const category_image = req.file.buffer;
      const result = await createNewCategoryDB(category_name, category_image)
      if (!result) return res.status(400).json({ message: "Failed to create a new category" });
      return res.status(201).json({ message: `Successfully added new category ${category_name}` })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateCategoryById: async (req, res) => {
    try {
      const id = req.params.id
      const { category_name } = req.body;
      const category_image = req.file.buffer;
      const result = await updateCategoryByIdDB(category_name, category_image, id)
      if (!result) return res.status(400).json({ message: "Failed to create a new category" });
      return res.status(201).json({ message: `Successfully update category ID of ${id} to ${category_name}` })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },

}

