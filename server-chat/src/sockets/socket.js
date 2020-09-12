const {server} = require('../config/server');
const io = require('socket.io')(server);
const AccountService = require('../services/AccountService');
const ChatService = require('../services/ChatService');



io.on('connection', socket => {
  socket.on('USER:AUTHORIZE', (userData) => {
    const accountService = new AccountService();
    accountService.findOne(userData).then(async user => {
      //console.log(user);
      const chats = await user.getChats();
      // console.log(chats);
      socket.emit('USER:SET_CHATS', chats);
    });
    console.log(userData);
  });

  socket.on('CHAT:TOGGLE_ACTIVE', (chatId) => {
    const chatService = new ChatService();
    chatService.readOne(chatId).then(async chat => {
      const messages = await chat.getMessages({include: 'from'});
      socket.emit('CHAT:TOGGLE_MESSAGES', messages);
    });
  });

  console.log('user  ' + socket.id);
});

module.exports = io;



