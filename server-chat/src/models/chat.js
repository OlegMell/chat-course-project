const { Model, Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

class Chat extends Model {}

Chat.init({
  name: Sequelize.STRING,
  image: Sequelize.STRING
}, { sequelize, modelName: 'chat' });

module.exports = Chat;
