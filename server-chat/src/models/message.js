const { Model, Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

class Message extends Model {}

Message.init({
  content: Sequelize.TEXT,
  edited: Sequelize.BOOLEAN,
  read: Sequelize.BOOLEAN,
}, { sequelize, modelName: 'message' });

module.exports = Message;
