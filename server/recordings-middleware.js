const path = require('path');
const mime = require('mime');
const multer = require('multer');
const multerS3 = require('multer-s3');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  acl: 'public-read',
  key: (req, file, done) => {
    const fileExtension = path.extname(file.originalname);
    const key = `${file.fieldname}-${Date.now()}${fileExtension}`;
    done(null, key);
  },
  contentType: (req, file, done) => {
    const contentType = mime.getType(file.originalname);
    done(null, contentType);
  }
});
const uploadsMiddleware = multer({
  storage
}).single('audio');

// For Teseting purposes for others
// const voicesDirectory = path.join(__dirname, 'public/voice');
// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, voicesDirectory);
//   },
//   filename(req, file, callback) {
//     const fileExtension = path.extname(file.originalname);
//     const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
//     callback(null, name);
//   }
// });

// const uploadsMiddleware = multer({ storage }).single('audio');

module.exports = uploadsMiddleware;
