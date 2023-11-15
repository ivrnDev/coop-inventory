const { getOrderAnalyticsDB, getProductSalesDB, salesDB } = require('../services/analytics.services')

module.exports = {
  getOrderAnalytics: async (req, res) => {
    try {
      const result = await getOrderAnalyticsDB();
      if (!result || result === null) return res.status(400).json({ message: 'No existing analytics' })
      if (!result) return res.status(400).json({ message: 'Failed to get analytics' })
      return res.status(200).json({ message: 'Successfully get analytics', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    } 
  },
  getOrderAnalytics: async (req, res) => {
    try {
      const result = await getOrderAnalyticsDB();
      if (!result || result === null) return res.status(400).json({ message: 'No existing analytics' })
      if (!result) return res.status(400).json({ message: 'Failed to get analytics' })
      return res.status(200).json({ message: 'Successfully get analytics', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    } 
  },
  getProductSales: async (req, res) => {
    try {
      const result = await getProductSalesDB();
      if (!result || result === null) return res.status(400).json({ message: 'No existing analytics' })
      if (!result) return res.status(400).json({ message: 'Failed to get analytics' })
      return res.status(200).json({ message: 'Successfully get analytics', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    } 
  },
  sales: async (req, res) => {
    try {
      const result = await salesDB();
      if (!result || result === null) return res.status(400).json({ message: 'No existing analytics' })
      if (!result) return res.status(400).json({ message: 'Failed to get all analytics' })
      return res.status(200).json({ message: 'Successfully get analytics', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    } 
  },
}