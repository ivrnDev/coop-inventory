const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct
} = require('./products.service.js');

const controller = {
  createProduct: (req, res) => {
    const { name, price, stocks } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    const imagePath = req.file.filename;
    
    createProduct({ name, price, stocks, imagePath }, (error, results) => {
      if (error) return res.status(400).json({ message: error })
      return res.status(201).json({
        message: "Successfully Created the data",
        data: results,
        
      })
    })
  },

  getProducts: (req, res) => {

    
    getProducts((error, results) => {
      if (error) return res.status(400).json({ message: error })
      return res.status(200).json(results)
    })
  },
  updateProducts: (req, res) => {
    updateProducts(req.body, req.params.id, (error, results) => {
      if(error) return res.status(400).json({message: error})
      return res.status(200).json({message: 'Successfully updated the products', results})
    }) 
  },
  deleteProduct: (req, res) => {
    deleteProduct(req.params.id, (error, results) => {
      if(error) return res.status(400).json({message: error});
      return res.status(200).json({message: `Successfully deleted product with an ID of ${req.params.id}`, results});
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