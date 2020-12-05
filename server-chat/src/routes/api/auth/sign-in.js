const signUpRoute = require('express').Router();
const SignInController = require('../../../controllers/SignInController');

signUpRoute.put('/', SignInController.signIn);

module.exports = signUpRoute;
