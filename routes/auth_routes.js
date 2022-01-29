const path = require('path');
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controllers');

router.get('/login',  authController.getLogin);
router.get('/logout',  authController.getLogout);
router.get('/signup',  authController.getSignup);
router.post('/login',  authController.postLogin);
router.post('/signup',  authController.postSignup);

router.get('/admin',authController.getAdmin)
router.get('/admin/add-content',authController.getAddContent)
router.post('/admin/add-content',authController.postAddContent)
router.get('/admin/view-content',authController.getViewContent)


module.exports = router;