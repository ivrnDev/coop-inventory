const { createBannerDB, deleteBannerDB, getAllBannersDB, getBannerByIdDB } = require('../services/banners.services')

module.exports = {
  createBanner: async (req, res) => {
    try {
      const image = req.files
      const result = await createBannerDB(image)
      if (!result) return res.status(400).json({ message: 'Failed to update banners' })
      return res.status(200).json({ message: `Successfully created a new banner`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  updateBanner: async (req, res) => {
    try {
      const image = req.files;
        const createBanner = await createBannerDB(image);
        if (!createBanner) return res.status(400).json({ message: 'Failed to update banners' })
        return res.status(200).json({ message: `Successfully updated a banner with an ID of ${id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getAllBanners: async (req, res) => {
    try {
      const result = await getAllBannersDB()
      if (result === null) return res.status(400).json(`There is no existing banners`)
      return res.status(201).json({ message: `Successfully get all banners`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getBannerById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getBannerByIdDB(id)
      if (result === null) return res.status(400).json({ error: `There is no existing banner with an ID of ${id}` })
      return res.status(201).json({ message: `Successfully get banner with an ID of ${id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
}