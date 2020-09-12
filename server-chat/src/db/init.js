const sequelize = require('./connection');

const Account = require('../models/account');
// const User = require('../models/user-data');
const Chat = require('../models/chat');
const Message = require('../models/message');
// const AccountChats = require('../models/accountChats');

// Account.hasOne(User);

Account.belongsToMany(Chat, { through: 'account_chats' });
Chat.belongsToMany(Account, { through: 'account_chats' });
// Message.belongsTo(Chat);
Chat.hasMany(Message);
Message.belongsTo(Account, { as: 'from' });
Message.belongsTo(Message, { as: 'reply' });

module.exports = sequelize.sync(/*{ force: true }*/);
