const { createOrders, getOrders } = require('./orders.services')

const controller = {
  createOrders: async (req, res) => {
    try {
      const result = await createOrders(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if(error) return res.status(500).json(error);
    }
  },
  getOrders: async (req, res) => {
    try {
      const result = await getOrders();
      return res.status(201).json(result);
    } catch (error) {
      if(error) return res.status(500).json(error);
    }
  },
}
module.exports = controller;