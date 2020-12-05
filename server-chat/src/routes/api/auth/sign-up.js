const signInRoute = require('express').Router();
const SignUpController = require('../../../controllers/SignUpController');

signInRoute.put('/', SignUpController.signUp);

module.exports = signInRoute;
