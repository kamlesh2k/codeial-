const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


console.log('router loaded in Home ');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post', require('./posts'));
router.use('/comments', require('./comments'));
module.exports = router;   