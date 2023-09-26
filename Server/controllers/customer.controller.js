const { getCustomersDB, createCustomerDB } = require('../services/customers.services');

module.exports = {
  createCustomer: async (req, res) => {
    const { customer_name, customer_phone, customer_email } = req.body;
    try {
      const result = await createCustomerDB(request)
      if (!result) res.status(400).json({ error: "Failed to insert customer" })
      return res.status(201).json({ message: "Successfully inserted a guest customer", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
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
