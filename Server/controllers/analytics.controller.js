const { getOrderAnalyticsDB } = require('../services/analytics.services')

module.exports = {
  getOrderAnalytics: async (req, res) => {
    try {
      const result = await getOrderAnalyticsDB();
      if (!result || result === null) return res.status(400).json({ message: 'No existing analytics' })
      if (!result) return res.status(400).json({ message: 'Failed to get all admin' })
      return res.status(200).json({ message: 'Successfully get analytics', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })
    } 
  },
}