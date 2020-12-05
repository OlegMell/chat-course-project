const {Op}  = require('sequelize');
const Message = require('../models/message');

class MessageService {
  constructor() {
    this.model = Message;
  }

  readOne(id) {
    return this.model.findByPk(id);
  }

  readAll() {
    return this.model.findAll({ limit: 100 });
  }

  create(message) {
    return this.model.create({
      ...message
    });
  }

}


module.exports = MessageService;