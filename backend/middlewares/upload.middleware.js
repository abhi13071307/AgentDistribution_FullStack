const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.csv', '.xls', '.xlsx'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .csv, .xls, and .xlsx files are allowed!'));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
