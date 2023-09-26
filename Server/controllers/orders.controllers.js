const { getAllOrdersDB, createOrderDB, updateOrderStatusDB } = require('../services/orders.services');
const { createCustomerDB } = require('../services/customers.services')
const { createTransactionDB, getTransactionByIdDB } = require('../services/transactions.services')

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const result = await getAllOrdersDB();
      if (result === null) return res.status(200).json({ message: "There is no available orders" })
      return res.status(200).json({ message: "Successfully get all the orders", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: erro })
    }
  },

  //Create Customer, Transaction, and Order
  createOrder: async (req, res) => {
    try {
      const { customer_name, customer_phone, customer_email, payment_method } = req.body.customer;

      //Create new transaction
      const customer = await createCustomerDB(customer_name,
        customer_phone, customer_email);//create customer
      if (!customer) return res.status(400).json({ message: "Failed to create a new order, customer information is invalid" })

      //Create new transaction
      const transaction = await createTransactionDB(customer.customer_id, payment_method)
      if (!transaction) return res.status(400).json({ message: "Failed to create a new order, transaction failed" });

      //Create order
      const orders = await createOrderDB(transaction.transaction_id, req.body.orders);

      const getTransactionReceipt = await getTransactionByIdDB(transaction.transaction_id);
      const result = {
        customer: customer,
        transaction: getTransactionReceipt[0],
        orders: orders
      }
      return res.status(200).json(result)
    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },
  updateOrderStatus: async (req, res) => {
    const { order_id, order_status } = req.query
    try {
      const result = await updateOrderStatusDB(null, null, order_id, order_status)
      if (!result) return res.status(400).json({ message: "Failed to updated order status" })
      return res.status(200).json({ message: "Successfully updated the order status", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }

  }


}