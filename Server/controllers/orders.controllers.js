const { getAllOrdersDB, createOrderDB, updateOrderStatusDB, getOrderbyIdDB, getOrderbyTransactionIdDB } = require('../services/orders.services');
const { createCustomerDB } = require('../services/customers.services')
const { createTransactionDB, getTransactionByIdDB } = require('../services/transactions.services')

module.exports = {
  //Create Customer, Transaction, and Order
  createOrder: async (req, res) => {
    const { customer, orders } = req.body
    try {
      const { student_id, customer_name, customer_phone, customer_email, payment_method } = customer;
      const customer = await createCustomerDB(student_id, customer_name, customer_phone, customer_email);
      if (!customer && customer === null) return res.status(400).json({ message: "Failed to create a new order, customer information is invalid" })

      const transaction = await createTransactionDB(customer.student_id, payment_method)
      if (!transaction) return res.status(400).json({ message: "Failed to create a new order, transaction failed" });

      await createOrderDB(transaction.transaction_id, orders);
      const transaction_receipt = await getTransactionByIdDB(transaction.transaction_id);
      const orderReceipt = await getOrderbyTransactionIdDB(transaction.transaction_id);
      const receipt = {
        transaction: transaction_receipt,
        orders: orderReceipt
      }
      return res.status(201).json(receipt)
    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const result = await getAllOrdersDB();
      if (result === null) return res.status(200).json({ message: "There is no available orders" })
      return res.status(200).json({ message: "Successfully get all the orders", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: erro })
    }
  },
  getOrderbyTransactionId: async (req, res) => {
    const { transaction_id } = req.query;
    try {
      const result = await getOrderbyTransactionIdDB(transaction_id);
      if (result === null) return res.status(200).json({ message: `There is no available orders for ID ${transaction_id}` })
      return res.status(200).json({ message: `Successfully get order with transaction ID of ${transaction_id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getOrderbyId: async (req, res) => {
    try {
      const result = await getOrderbyIdDB(req.params.id);
      if (result === null) return res.status(200).json({ message: `There is no available orders for ID ${req.params.id}` })
      return res.status(200).json({ message: `Successfully get order with order ID of ${req.params.id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: erro })
    }
  },

}