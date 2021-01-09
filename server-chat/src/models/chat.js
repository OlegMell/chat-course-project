const { Model, Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

class Chat extends Model {}

Chat.init({
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  alerted: Sequelize.BOOLEAN
}, { sequelize, modelName: 'chat' });

module.exports = Chat;
