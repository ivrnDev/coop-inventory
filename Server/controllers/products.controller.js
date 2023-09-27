const fs = require('fs').promises;
const { createProductDB, createVariantsDB, updateProductsDB, updateVariantsDB, getAllProductsDB, getProductByIdDB } = require('../services/products.services')

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
      const { product_name, display_name, display_price, product_stocks, product_description } = req.body;

      //Create Product
      const createdProduct = await createProductDB(product_name, display_name, display_price, product_stocks, product_description, imagePath);

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
      return res.status(500).json(error)
    }
  },
}

