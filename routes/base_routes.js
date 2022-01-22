const path = require('path');
const express = require('express');
const router = express.Router();

const baseController = require('../controllers/base_controllers');

router.get('/',  baseController.getLanding);
router.get('/test',  baseController.getLanding);
router.get('/about',  baseController.getAbout);
router.get('/todo',  baseController.getToDo);


module.exports = router;