const indexRoute = require('express').Router();
const SignInRoute = require('./api/auth/sign-in');

indexRoute.use('/api/auth/sign-in', SignInRoute);

module.exports = indexRoute;


