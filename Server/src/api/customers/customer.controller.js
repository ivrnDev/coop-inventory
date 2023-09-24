const {getCustomersDB} = require('./customers.services');

const controller = {
  getCustomers: async (req, res) => {
    try {
      const result = await getCustomersDB();
      return res.status(200).json(result);
    } catch (error) {
      if(error) return res.status(400).json(error);
    }
  }

}

module.exports = controller;