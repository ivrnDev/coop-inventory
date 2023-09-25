const { getAllTransactionsDB, updateTransactionStatusDB, updateOrderStatusDB } = require('./transactions.services')

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
  updateTransactionStatus: async (req, res) => {
    const { transaction_id, transaction_status } = req.query
    try {
        const result = await updateTransactionStatusDB(transaction_id, transaction_status);
        if (!result) return res.status({ messagel: "Failed to update transaction status" })
        res.status(200).json({ message: `Transaction status was successfully set to ${transaction_status}` })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
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
