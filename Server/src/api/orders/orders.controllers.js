const { createOrderDB, getTransactionsDB } = require('./orders.services')

const controller = {
  createOrder: async (req, res) => {
    try {
      const result = await createOrderDB(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },
  getTransactions: async (req, res) => {
    try {
      const result = await getTransactionsDB();
      return res.status(201).json(result);
    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },
}
module.exports = controller;