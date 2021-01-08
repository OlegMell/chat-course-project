const signInRoute = require('express').Router();
const SignUpController = require('../../../controllers/auth/SignUpController');

signInRoute.put('/', SignUpController.signUp);

module.exports = signInRoute;
