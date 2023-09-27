const { createProductAlbumDB, getAlbumByIdDB, getAllAlbumsDB, getProductAlbumByIdDB, updateProductAlbumImageDB } = require('../services/albums.services');
module.exports = {
  //Create product album
  createProductAlbum: async (req, res) => {
    console.log(req.files)
    const album = req.files
    const { productId } = req.query
    try {
      const result = await createProductAlbumDB(productId, album)
      if (!result) return res.status(400).json({ message: 'Failed to upload product albums' })
      return res.status(201).json({ message: 'Successfully uploaded product album', result: result })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error })

    }
  },
  updateProductAlbumImage: async (req, res) => {
    try {
      let image;
      //Check if there is an image
      if (req.file) {
        image = req.file.buffer;
      } else {
        return res.status(200).json({ message: "Photo has not been updated, invalid photo" })
      }

      //Update product
      const result = await updateProductAlbumImageDB(req.params.id, image)
      if (!result) return res.status(400).json({ message: "Failed to update product" });

      return res.status(200).json({ message: `Successfully Updated the photo with an ID of ${req.params.id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error });
    }
  },
  getAllAlbums: async (req, res) => {
    try {
      const result = await getAllAlbumsDB();
      if (result === null) return res.status(404).json({ error: "There is no existing albums" })
      return res.status(200).json({ message: "Successfully get all the albums", result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getAlbumById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getAlbumByIdDB(id);
      if (result === null) return res.status(404).json({ error: `There is no existing albums with photo ID of ${id}` })
      return res.status(200).json({ message: `Successfully get the album with photo ID of ${id}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
  getProductAlbumById: async (req, res) => {
    try {
      const { productId } = req.query
      const result = await getProductAlbumByIdDB(productId);
      if (result === null) return res.status(404).json({ error: `There is no existing albums with photo ID of ${id}` })
      return res.status(200).json({ message: `Get all the albums of product ID of ${productId}`, result: result })
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error })
    }
  },
 

}