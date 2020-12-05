const {Op} = require('sequelize');

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

  findOne({ email}) {
    return this.model.findOne({
      where: {
        email
      }
    })
  }

  findOneByUsername(username) {
    return this.model.findAll({
      // raw: true,
      where: {
        username: {
          [Op.like]: `${username}%`
        }
      }
    });
  }

  create(user) {
    return this.model.create({
      ...user
    });
  }

}


module.exports = AccountService;