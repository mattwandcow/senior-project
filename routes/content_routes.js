const path = require('path');
const express = require('express');
const router = express.Router();

const contentController = require('../controllers/content_controllers');

router.get('/content/:contentID',  contentController.getSingleContent);

module.exports = router;