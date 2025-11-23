const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure storage for different upload types
const createStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });
};

// File filter to only accept images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Create upload middleware for different purposes
const loveStoryUpload = multer({
  storage: createStorage('./uploads/love-stories'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const pickupLineUpload = multer({
  storage: createStorage('./uploads/pickup-lines'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const profileUpload = multer({
  storage: createStorage('./uploads/profiles'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = {
  loveStoryUpload,
  pickupLineUpload,
  profileUpload
};
