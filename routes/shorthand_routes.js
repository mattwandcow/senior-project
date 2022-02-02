const path = require('path');
const express = require('express');
const router = express.Router();

const shorthandController = require('../controllers/shorthand_controllers');

router.get('/shorthand/rate/:contentID/:userID/:choice',  shorthandController.logReview);

module.exports = router;