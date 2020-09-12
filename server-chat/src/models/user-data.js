const { Model, Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

class User extends Model {}

User.init({
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  phone: Sequelize.STRING,
  username: Sequelize.STRING,
  bio: Sequelize.STRING
}, { sequelize, modelName: 'users', timestamps: false });

module.exports = User;
