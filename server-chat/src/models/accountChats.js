const { Model, Sequelize } = require('sequelize');
const sequelize = require('../db/connection');

class AccountChats extends Model {}

AccountChats.init({
}, { sequelize, modelName: 'account_chats' });

module.exports = AccountChats;
