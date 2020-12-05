const Chat = require('../models/chat');
// const md5 = require('md5');

class ChatService {
  constructor() {
    this.model = Chat;
  }

  readOne(id) {
    return this.model.findByPk(id);
  }

  readOneByName(name) {
    return this.model.findOne({
      where: {
        name,
      }
    })
  }

  readAll() {
    return this.model.findAll();
  }

  create(name) {
    return this.model.create({
      name,
      image: '1MJAO58qs2NWb0W0Egg9H08FrakdoJ_T5'
    });
  }

}


module.exports = ChatService;