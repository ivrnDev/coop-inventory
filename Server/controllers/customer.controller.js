const { getCustomersDB, createCustomerDB, getCustomerbyIdDB } = require('../services/customers.services');

module.exports = {
  createCustomer: async (req, res) => {
    const { customer_name, customer_phone, customer_email } = req.body;
    try {
      const result = await createCustomerDB(customer_name, customer_phone, customer_email);
      if (!result) res.status(400).json({ error: "Failed to insert customer" })
      return res.status(201).json({ message: "Successfully inserted a guest customer", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getCustomers: async (req, res) => {
    try {
      const result = await getCustomersDB();
      if (!result) return res.status(404).json({ error: "Failed to get the list of customers" })
      return res.status(200).json({ message: "Successfully get all the customers", result: result });
    } catch (error) {
      if (error) return res.status(400).json({ message: "Internal Server Error", error: error });
    }
  },
  getCustomerById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getCustomerbyIdDB(id);
      if (result === null) res.status(404).json({ error: `There is no existing customer with an ID of ${id}` })
      if (!result) return res.status(404).json({ error: "Failed to get the list of customers" })
      return res.status(200).json({ message: `Successfully get customer with an ID of ${id}`, result: result });
    } catch (error) {
      if (error) return res.status(400).json({ message: "Internal Server Error", error: error });
    }
  }
}
