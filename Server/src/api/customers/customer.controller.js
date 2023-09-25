const { getCustomersDB, createCustomerDB } = require('./customers.services');

module.exports = {
  createCustomer: async (req, res) => {
    try {
      const result = await createCustomerDB(req)
      if (!result) res.status(400).json({ error: "Failed to insert customer" })
      return res.status(201).json({message: "Successfully inserted a guest customer", result: result})
    } catch (error) {
      return res.status(500).json({message: "Internal Server Error", error: error})
    }
  },
  getCustomers: async (req, res) => {
    try {
      const result = await getCustomersDB();
      return res.status(200).json(result);
    } catch (error) {
      if (error) return res.status(400).json(error);
    }
  }

}
