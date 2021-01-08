const signUpRoute = require('express').Router();
const SignInController = require('../../../controllers/auth/SignInController');

signUpRoute.put('/', SignInController.signIn);

module.exports = signUpRoute;
