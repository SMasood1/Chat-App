const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { validationResult } = require('express-validator');

const { createAccessToken, sendAccessToken } = require("../util/token");


exports.postSignup = (async (req, res) => {
  const { username, password } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw {
        errorType: 'INPUT_ERROR',
        validationError: errors.array()
      }
    }

    let user = await User.findOne({ username: username }).exec();
    if (user) {
      throw {
        errorType: 'INPUT_ERROR',
        validationError: 'User already exists!'
      }
    }

    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await new User({ username: username, password: hashedPassword }).save();
    res.status(200).send('USER_CREATED');
  } catch (error) {
    if ('INPUT_ERROR' === error.errorType) {
      res.status(422).send({
        ...error,
        // For future use
        oldInput: {
          username: username,
          password: password,
        },
      });
    } else {
      res.status(400).send({ message: 'Requst to server was sucessful, but there was an error!' });
    }
  }
});

exports.postSignin = (async (req, res) => {

  const { username, password } = req.body;
  const errors = validationResult(req);

  const errorMessage = {
    errorType: 'INPUT_ERROR',
    validationError: 'Invalid username/password!'
  };
  
  try {
    if (!errors.isEmpty()) {
      console.log(2);
      throw {
        errorType: 'INPUT_ERROR',
        validationError: errors.array()
      }
    }
    console.log(username);

    let user = await User.findOne({ username: username }).exec();
    console.log(user);
    if (!user) {
      console.log('1');
      throw errorMessage;
    }
    const isValidPasssword = bcrypt.compareSync(password, user.password);

    if (isValidPasssword) {
      const accesstoken = createAccessToken(user._id);
      sendAccessToken(req, res, accesstoken);
    }else{
      console.log('3')
      throw errorMessage;
    }
  } catch (error) {
    if ('INPUT_ERROR' === error.errorType) {
      res.status(422).send({
        ...error,
        oldInput: {
          username: username,
          password: password,
        },
      });
    } else {
      res.status(400).send({ message: 'Requst to server was sucessful, but there was an error!' });
    }
  }
});

exports.deleteSignout = (async (req, res) => {
  try {
    await req.session.destroy((err) => {
      throw new Error('SESSION_NOT_DESTROYED')
    });
    res.send(200);
  } catch (error) {
    res.status(400).send({
      message: `${err.message}`
    });
  }
})