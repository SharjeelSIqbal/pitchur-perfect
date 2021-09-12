const path = require('path');
const multer = require('multer');

const voicesDirectory = path.join(__dirname, 'public/voice');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, voicesDirectory);
  },
  filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({ storage }).single('audio');

module.exports = uploadsMiddleware;
