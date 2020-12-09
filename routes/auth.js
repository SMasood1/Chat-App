const router = require("express").Router();
const { body } = require('express-validator');

const User = require('../models/User');
const authController = require('../controllers/auth');

router.post("/signin", [
  body('email')
    .isEmail()
    .withMessage('Enter a valid value')
    .normalizeEmail({ all_lowercase: true }),
  body('username', 'Enter a valid length of 5 charicters or more')
    .isLength({ min: 5 }),
  body('password', 'Enter a minimum of 8 charicters')
    .isLength({ min: 8 })
    .trim()
],
  authController.postSignin);

router.post("/signup", [
  body('email')
    .isEmail()
    .withMessage('Enter a valid value')
    .normalizeEmail({ all_lowercase: true }),
  body('username')
    .isLength({ min: 5 })
    .withMessage('Enter a valid length of 5 charicters or more')
    .custom(async (value) => {
      let user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject('Name already exists pick a different one');
      }
    }),
  body('password', 'Enter a minimum of 8 charicters')
    .isLength({ min: 8 })
    .trim()
],
  authController.postSignup);

module.exports = router;