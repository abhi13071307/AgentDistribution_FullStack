const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const uploadController = require('../controllers/upload.controller');

// Single file field named "file"
router.post('/', auth, upload.single('file'), uploadController.handleUpload);

module.exports = router;
