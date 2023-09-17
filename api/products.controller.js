const {
  createProduct,
  getProducts,
  getProductDetails } = require('./products.service.js');

const controller = {
  createProduct: (req, res) => {
    createProduct(req.body, (error, results) => {
      if (error) return res.status(400).json({ message: error })
      return res.status(201).json({
        message: "Successfully Created the data",
        data: results
      })
    })
  },
  getProducts: (req, res) => {
    getProducts((error, results) => {
      if (error) return res.status(400).json({ message: error })
      return res.status(200).json({ message: "Successully fetched all the products", data: results })
    })
  },
  // getProductDetails: (req, res) => {
  //   getProductDetails((req.body, (error, results) => {
  //     if(error) return res.status(400).json({message: error});
  //     return res.status(200).json({message: "Fetched the data", data: results})
  //   }))
  // }
}

module.exports = controller