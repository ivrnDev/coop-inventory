const { createCustomerDB, createTransactionDB, createOrderDB, getTransactionsDB } = require('./orders.services')

const controller = {
  createOrder: async (req, res) => {
    try {
      const customerData = req.body.customer
      customer = await createCustomerDB(customerData); //create customer
      transaction = await createTransactionDB(customer.customer_id) // create transaction
      
      const orderData = req.body.orders;
      const orders = await createOrderDB(
        transaction.transaction_id,
        orderData.product_id,
        orderData.variant_id,
        orderData.quantity
      );





      const result = {
        customer,
        transactions,
        orders
      }


      return res.status(200).json(result)







    } catch (error) {
      if (error) return res.status(500).json(error);
    }
  },








  getTransactions: async (req, res) => {
    try {
      const result = await getTransactionsDB();
      if (result === null) return res.status(404).json({ error: "There is no records of transactions" })
      return res.status(201).json({ message: 'Successfully get all the transactions', result: result });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
  },
}
module.exports = controller;