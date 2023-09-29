const pool = require('../db/database');
const { bannerQueries } = require('../db/dbQueries');
const { createBannerQuery, updateBannerQuery, getAllBannersQuery, getBannerByIdQuery } = bannerQueries

module.exports = {
  createBannerDB: (image) => {
    return new Promise((resolve, reject) => {
      pool.execute(createBannerQuery, [image], (error, result) => {
        if (error) reject(error);
        return resolve(result);
      })
    })
  },
  updateBannerDB: async (image, id) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateBannerQuery, [image, id], (error, result) => {
        if (error) reject(error);
        return resolve(result);
      })
    })

  },
  getAllBannersDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllBannersQuery, [], (error, result) => {
        if (error) reject(error);
        if (result.length === 0) resolve(null);
        const banner = result.map((banner => ({
          banner_id: banner.banner_id,
          banner_image: banner.banner_image.toString('base64')
        })))
        return resolve(banner);
      })
    })
  },
  getBannerByIdDB: (id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getBannerByIdQuery, [id], (error, result) => {
        if (error) reject(error);
        if (result.length === 0) resolve(null);
        const banner = result.map((banner => ({
          banner_id: banner.banner_id,
          banner_image: banner.banner_image.toString('base64')
        })))
        return resolve(banner);
      })
    })
  },
}