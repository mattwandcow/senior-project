const path = require('path');
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controllers');

router.get('/login',  authController.getLogin);
router.get('/signup',  authController.getSignup);
router.post('/login',  authController.postLogin);
router.post('/signup',  authController.postSignup);


module.exports = router;