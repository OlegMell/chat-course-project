const stateRoute = require('express').Router();
const StateController = require('../../../controllers/data/StateController');

stateRoute.post('/', StateController.getInitialState);

module.exports = stateRoute;
