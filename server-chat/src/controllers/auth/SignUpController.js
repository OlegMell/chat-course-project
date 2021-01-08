const jwt = require('jsonwebtoken');
const md5 = require('md5');
const AccountService = require('../../services/AccountService');

class SignUpController {
  static async signUp(req, res) {
    const accountService = new AccountService();
    const user = {...req.body, password: md5(req.body.password)};
    accountService.create(user).then(user => {
      return res.status(200).json({
        login: user.email,
        token: jwt.sign({login: user.email}, process.env.TOKEN_KEY),
      });
    });
    console.log(req.body);
    // res.status(200).send();
  }
}

module.exports = SignUpController;