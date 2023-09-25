const { createOrderDB, getAllOrdersDB } = require('./orders.services');
const { createCustomerDB } = require('../customers/customers.services');
const { createTransactionDB } = require('../transactions/transactions.services');

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const result = await getAllOrdersDB();
      if(result === null) return res.status(200).json({message: "There is no available orders"}) 
      return res.status(200).json({message: "Successfully get all the orders", result: result})
    } catch (error) {
      return res.status(500).json({message: "Internal Server Error", error: erro})
    }
  },

  //Create Customer, Transaction, and Order
  createOrder: async (req, res) => {
    try {
      const customer = await createCustomerDB(req.body.customer); //create customer
      const transaction = await createTransactionDB(customer.customer_id) // create transaction
      const orders = await createOrderDB(req.body.orders, transaction.transaction_id);
      const result = {
        customer,
        transaction,
        orders
      }
      return res.status(200).json(result)
    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },


}