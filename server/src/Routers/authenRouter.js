const express = require('express');
const router = express.Router();
const registerController = require('../app/Controllers/authenController');

router.post('/register', registerController.register);

module.exports = router;