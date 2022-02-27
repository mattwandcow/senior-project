const path = require('path');
const express = require('express');
const router = express.Router();

const adminController  = require('../controllers/admin_controllers');


// const multer = require('multer');
// const upload = multer({ dest: "./public/images" });

router.get('/add-image/:contentID',  adminController.getAddImage);
//router.post('/add-image/:contentID', upload.single("image"),  adminController.postAddImage);
router.post('/add-image/:contentID', adminController.postAddImage);

module.exports = router;