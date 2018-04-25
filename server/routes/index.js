var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET home page. */
router.post('/register', userController.signUp);
router.post('/login', userController.signIn);

module.exports = router;
