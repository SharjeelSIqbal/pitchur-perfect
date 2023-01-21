const path = require('path');
const mime = require('mime');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require('@aws-sdk/client-s3');

const s3Params = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  region: process.env.DB_REGION
};

const s3 = new S3(s3Params);

const storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET,
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

module.exports = uploadsMiddleware;
