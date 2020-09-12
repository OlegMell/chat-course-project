const signInRoute = require('express').Router();
const SignInController = require('../../../controllers/SignInController');

signInRoute.put('/', SignInController.signIn);

module.exports = signInRoute;
