const router = require("express").Router();
const { body } = require('express-validator');

const User = require('../models/User');
const authController = require('../controllers/auth');

router.post("/signin", [
  body('username', 'Valid length is more then 5 charicters.')
    .isLength({ min: 5 }),
  body('password', 'Please enter a password with min of 8 charicters.')
    .isLength({ min: 8 })
    .trim()
],
  authController.postSignin);

router.post("/signup", [
  body('username')
    .isLength({ min: 5 })
    .withMessage('Valid length is more then 5 charicters.')
    .custom(async (value) => {
      let user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject('User name exists, please pick a different one.');
      }
    }),
  body('password', 'Please enter a password with min of 8 charicters.')
    .isLength({ min: 8 })
    .trim()
],
  authController.postSignup);

module.exports = router;