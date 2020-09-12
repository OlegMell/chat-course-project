const Chat = require('../models/chat');
// const md5 = require('md5');

class ChatService {
  constructor() {
    this.model = Chat;
  }

  readOne(id) {
    return this.model.findByPk(id);
  }

  readAll() {
    return this.model.findAll();
  }

}


module.exports = ChatService;