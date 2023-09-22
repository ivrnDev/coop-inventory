const { createCustomer, getCustomers } = require('./customers.service')

const controller = {
  createCustomer: async (req, res) => {
    console.log(req.body)
    try {
      const result = await createCustomer(req.body);
      return res.status(201).json(result)
    } catch (error) {
      if (error) return res.status(500).json(error)
    }
  },
  getCustomers: async (req, res) => {
    try {
      const result = await getCustomers()
      return res.status(200).json(result);
    } catch (error) {
      if(error) return res.status(404).json(error);     
    }

  }
}

module.exports = controller;

