const { createCustomerDB, createTransactionDB, createOrderDB, getTransactionsDB } = require('./orders.services')

const controller = {
  createOrder: async (req, res) => {
    try {
      const result = {};
      result.customer = await createCustomerDB(req.body.customer); //create customer
      
      const {customer_email} = req.body.customer;
      result.transactions = await createTransactionDB(customer_email) // create transaction
      return res.status(200).json(result)















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