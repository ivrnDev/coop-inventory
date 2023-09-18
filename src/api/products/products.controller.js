const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct
} = require('./products.service.js');

const controller = {
  createProduct: async (req, res) => {
    try {      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded, image is required' });
      }
      const imagePath = req.file.filename;
      const result = await createProduct(req.body, imagePath) 
      return res.status(201).json(result)
    } catch (error) {
      if (error) return res.status(500).json(error)
    }
  },
  getProducts: async (req, res) => {
    try {
      const result = await getProducts();
      return res.status(200).json(result)
    } catch (error) {
      return res.status(404).json(error)
    }
  },
  updateProducts: async (req, res) => {
    try {
      const imagePath = req.file.filename;
      const result = await updateProducts(req.body, req.params.id, imagePath) 
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json(error);
    } 
  },
  deleteProduct: (req, res) => {
    deleteProduct(req.params.id, (error, results) => {
      if (error) return res.status(400).json({ message: error });
      return res.status(200).json({ message: `Successfully deleted product with an ID of ${req.params.id}`, results });
    })
  }











  // getProductDetails: (req, res) => {
  //   getProductDetails((req.body, (error, results) => {
  //     if(error) return res.status(400).json({message: error});
  //     return res.status(200).json({message: "Fetched the data", data: results})
  //   }))
  // }
}

module.exports = controller