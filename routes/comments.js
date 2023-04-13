
const express = require('express');
const router = express.Router();
const passport = require('passport');

const commmentsController = require('../controllers/comments_controller');


router.post('/create', passport.checkAuthentication  , commmentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commmentsController.destroy);


module.exports = router;