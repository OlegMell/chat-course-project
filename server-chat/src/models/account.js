const { Model, Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

class Account extends Model {}

Account.init({
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  phone: Sequelize.STRING,
  username: Sequelize.STRING,
  bio: Sequelize.STRING,
  image: Sequelize.STRING
}, { sequelize, modelName: 'accounts' });

module.exports = Account;
