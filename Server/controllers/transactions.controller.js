const mailer = require('../lib/mailer');
const { getOrderbyTransactionIdDB } = require('../services/orders.services');
const { getAllTransactionsDB, getAllFilteredTransactionsDB, updateTransactionStatusDB, getTransactionByIdDB } = require('../services/transactions.services');

module.exports = {
  getAllTransactions: async (req, res) => {
    try {
      const result = await getAllTransactionsDB();
      if (result === null) return res.status(404).json({ error: "There is no records of transactions" })
      return res.status(201).json({ message: 'Successfully get all the transactions', result: result });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
  },
  getTransactionById: async (req, res) => {
    try {
      const result = await getTransactionByIdDB(req.params.id);
      if (result === null) return res.status(404).json({ message: `There is no record of transaction with an ID of ${req.params.id}` })

      return res.status(201).json({ message: `Successfully get transaction with an ID of ${req.params.id}`, result: result });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
  },
  updateTransactionStatus: async (req, res) => {
    const { id } = req.params;
    const { set } = req.query
    let operation = set === 'completed' ? 'subtract' : set === 'cancelled' ? 'add' : null

    try {
      const transactionbyID = await getTransactionByIdDB(id)
      if (!transactionbyID || transactionbyID === null) return res.status(404).json({ message: `There is no transaction with an id of ${id}` });
      const orders = await getOrderbyTransactionIdDB(id)
      if (!orders || orders === null) return res.status(404).json({ message: `There is no order with transaction id of ${id}` });
      const result = await updateTransactionStatusDB(id, set, operation, orders);
      if (!result) return res.status(400).json({ message: "Failed to update transaction status" });
      return res.status(200).json({ message: `Transaction status was successfully set to ${set}` })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
}
