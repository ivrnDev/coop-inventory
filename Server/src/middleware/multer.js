  const multer = require('multer');

  const FILE_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
  };

  const upload =  multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
      if(file.mimetype in FILE_TYPE ) {
        file.filename = `${Date.now}-${file.originalname}`
        callback(null, true)
      } else {
        callback(null, false)
      }
    }
  })

  module.exports = upload

