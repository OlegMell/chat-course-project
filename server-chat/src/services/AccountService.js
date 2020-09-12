const Account = require('../models/account');
const md5 = require('md5');

class AccountService {
  constructor() {
    this.model = Account;
  }

  readOne(id) {
    return this.model.findByPk(id);
  }

  readAll() {
    return this.model.findAll();
  }

  findOne({ email }) {
    return this.model.findOne({
      //raw: true,
      where: {
        email
      }
    })
  }

}


module.exports = AccountService;