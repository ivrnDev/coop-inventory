const {
  createProductDB,
  getProductsDB,
  updateProductsDB,
  deleteProductDB
} = require('./products.service.js');

const controller = {
  createProduct: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Image is required with a file type JPG, JPEG, or PNG' });
      }
      const imagePath = req.file.buffer;
      const result = await createProductDB(req.body, imagePath)
      return res.status(201).json(result)
    } catch (error) {
      if (error) return res.status(500).json(error)
    }
  },
  getProducts: async (req, res) => {
    try {
      const result = await getProductsDB();
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json(error)
    }
  },
  updateProducts: async (req, res) => {
   
    try {
      const imagePath = req.file.buffer;
      const result = await updateProductsDB(req.body, req.params.id, imagePath)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // deleteProduct: async (req, res) => {
  //   try {
  //     const result = await deleteProductDB(req.params.id);
  //     res.status(200).json({ message: `Successfully deleted product with an ID of ${req.params.id}`, result });
  //   } catch (error) {
  //     return res.status(400).json(error);
  //   }
  // }
}


module.exports = controller