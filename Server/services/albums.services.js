const pool = require('../db/database');
const { albumQueries } = require('../db/dbQueries');
const { createProductAlbumQuery, updateProductAlbumImageQuery, getAlbumByIdQuery, getAllAlbumsQuery, getProductAlbumByIDQuery } = albumQueries
module.exports = {
  createProductAlbumDB: (product_id, albums) => {
    return new Promise((resolve, reject) => {
      albums.map(photo => {
        pool.execute(createProductAlbumQuery, [product_id, photo.buffer], (error, result) => {
          if (error) return reject(error)
          return resolve(result)
        })
      })
    })
  },
  updateProductAlbumImageDB: (album_id, image) => {
    return new Promise((resolve, reject) => {
      pool.execute(updateProductAlbumImageQuery, [image, album_id], (error, result) => {
        if (error) return reject(error)
        return resolve(result)
      })
    })
  },
  getAllAlbumsDB: () => {
    return new Promise((resolve, reject) => {
      pool.execute(getAllAlbumsQuery, [], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) {
          return resolve(null)
        } else {
          const productsAlbum = result.map((album) => ({
            photo_id: album.photo_id,
            product_id: album.product_id,
            display_image: album.product_photo.toString('base64'),
          }))
          return resolve(productsAlbum)
        }
      })
    })
  },
  getAlbumByIdDB: (photo_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getAlbumByIdQuery, [photo_id], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) {
          return resolve(null)
        } else {
          const album = result.map((album) => ({
            photo_id: album.photo_id,
            product_id: album.product_id,
            display_image: album.product_photo.toString('base64'),
          }))
          return resolve(album)
        }
      })
    })
  },
  getProductAlbumByIdDB: (product_id) => {
    return new Promise((resolve, reject) => {
      pool.execute(getProductAlbumByIDQuery, [product_id], (error, result) => {
        if (error) return reject(error)
        if (result.length === 0) return resolve(null)
        const album = result.map((album) => ({
          photo_id: album.photo_id,
          product_id: album.product_id,
          display_image: album.product_photo.toString('base64'),
        }))
        return resolve(album)
      })
    })
  },
}