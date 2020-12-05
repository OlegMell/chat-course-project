const indexRoute = require('express').Router();
const SignInRoute = require('./api/auth/sign-in');
const SignUpRoute = require('./api/auth/sign-up');

indexRoute.use('/api/auth/sign-in', SignInRoute);
indexRoute.use('/api/auth/sign-up', SignUpRoute);

module.exports = indexRoute;


