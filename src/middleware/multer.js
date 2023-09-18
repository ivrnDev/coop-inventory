const multer = require('multer');
const fs = require('fs');

const uploadDirectory = './images';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const FILE_TYPE = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

function fileFilter(req, file, callback) {
  if (file.mimetype in FILE_TYPE) {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
