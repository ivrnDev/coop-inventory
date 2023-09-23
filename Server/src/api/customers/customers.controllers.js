const {createCustomerDB, getCustomersDB} = require('./customer.services.js');
const controller = {
  createCustomer: async (req, res) => {
    try {
      const result = await createCustomerDB(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },
  getCustomers: async (req, res) => {
    try {
      const result = await getCustomersDB();
      return res.status(200).json(result);
    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },
}

module.exports = controller;