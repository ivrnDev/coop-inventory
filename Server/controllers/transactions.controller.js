const { getAllTransactionsDB, updateTransactionStatusDB, getTransactionByIdDB, updateOrderStatusDB } = require('../services/transactions.services');

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
    try {
      const result = await updateTransactionStatusDB(id, set);
      if (!result) return res.status({ message: "Failed to update transaction status" });
      return res.status(200).json({ message: `Transaction status was successfully set to ${set}` })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateOrderStatus: async (req, res) => {
    const { id } = req.params;
    const { set } = req.query
    try {
      const result = await updateOrderStatusDB(id, set)
      if (!result) return res.status(400).json({ message: "Failed to updated order status" })
      return res.status(200).json({ message: "Successfully updated the order status", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }

  }
}
