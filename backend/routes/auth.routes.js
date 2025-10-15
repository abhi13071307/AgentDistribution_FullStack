const router = require('express').Router();
const { login, loginValidators } = require('../controllers/auth.controller');

router.post('/login', loginValidators, login);

module.exports = router;
