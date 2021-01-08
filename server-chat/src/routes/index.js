const indexRoute = require('express').Router();
const SignInRoute = require('./api/auth/sign-in');
const SignUpRoute = require('./api/auth/sign-up');
const StateRoute = require('./api/data/state');

indexRoute.use('/api/auth/sign-in', SignInRoute);
indexRoute.use('/api/auth/sign-up', SignUpRoute);
indexRoute.use('/api/data/state', StateRoute);

module.exports = indexRoute;


