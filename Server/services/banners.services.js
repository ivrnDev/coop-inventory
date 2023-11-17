const pool = require('../db/database');
const { bannerQueries } = require('../db/dbQueries');
const { createBannerQuery, deleteBannerQuery, getAllBannersQuery, getBannerByIdQuery } = bannerQueries

module.exports = {
  createBannerDB: (image) => {
    return new Promise(async (resolve, reject) => {
      await module.exports.deleteBannerDB();
      image.map(photo => {
        pool.execute(createBannerQuery, [photo.buffer], (error, result) => {
          if (error) return reject(error)
          return resolve(result)
        })
      })
    })
  },
  deleteBannerDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(deleteBannerQuery, [], (error, result) => {
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