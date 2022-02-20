const path = require('path');
const express = require('express');
const router = express.Router();

const contentController = require('../controllers/content_controllers');

router.get('/content/:contentID',  contentController.getSingleContent);
router.get('/search',  contentController.getSearch);
router.post('/search',  contentController.postSearch);
router.get('/waves',  contentController.getViewWaves);
router.get('/recommendations',  contentController.getRecommendations);

module.exports = router;