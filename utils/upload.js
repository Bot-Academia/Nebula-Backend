const multer = require('multer');

const uploadImage = (data, location) => {
  const upload = multer({ dest: `uploads/${location}` });
  upload.single(data);
};

module.exports = uploadImage;
