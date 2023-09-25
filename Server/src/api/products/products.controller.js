const {
  createProductDB,
  createVariantsDB,
  getProductsDB,
  updateProductsDB,
  getProductByIdDB,
  updateVariantsDB
} = require('./products.services.js');
const fs = require('fs').promises;

module.exports = {
  //Create new product
  createProduct: async (req, res) => {
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

      //Create Product
      const createdProduct = await createProductDB(req.body, imagePath);
      if (!createdProduct) return res.status(400).json({ message: "Failed to insert product" });

      const { product_id } = createdProduct.product;
      const { variant_name, variant_symbol, variant_price } = req.body;
      const variants = variant_name.map((name, index) => ({
        variant_name: name,
        variant_symbol: variant_symbol[index],
        variant_price: variant_price[index],
      }));

      //Create Variants
      const createdVariants = await createVariantsDB(product_id, variants)

      const result = {
        createdProduct,
        createdVariants
      }
      return res.status(201).json({ result: result });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },
  //Get all products list
  getProducts: async (req, res) => {
    try {
      const result = await getProductsDB();
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
      const updatedProduct = await updateProductsDB(req.body, req.params.id, imagePath)
      if (updatedProduct === null) return res.status(404).json({ message: `There is no product with an ID of ${req.params.id}` });
      if (!updatedProduct) return res.status(400).json({ message: "Failed to update product" });

      const { variant_name, variant_symbol, variant_price } = req.body;

      const variant = variant_name.map((name, index) => ({
        variant_name: name,
        variant_symbol: variant_symbol[index],
        variant_price: variant_price[index]
      }))

      const updateVariants = await updateVariantsDB(req.params.id, variant);


      const result = {
        updatedProduct,
        updateVariants
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

