const jwt = require('jsonwebtoken');
const md5 = require('md5');
const AccountService = require('../../services/AccountService');

class SignInController {
  static async signIn(req, res) {
    const accountService = new AccountService();
    accountService.findOne(req.body).then((data) => {
      if (data === null) {
        return res.status(404).json({message: 'User not found'});
      }
      if (data.password === md5(req.body.password)) {
        return res.status(200).json({
          user: data,
          token: jwt.sign({login: data.email}, process.env.TOKEN_KEY),
        });
      } else {
        return res.status(404).json({message: 'Wrong password'});
      }
    }).catch((err) => {
      console.log(err);
    });

    // if (req.body.login === process.env.USER_LOGIN
    //     && req.body.password === process.env.USER_PASSWORD) {
    //   return res.status(200).json({
    //     login: process.env.USER_LOGIN,
    //     token: jwt.sign({ login: process.env.USER_LOGIN }, process.env.TOKEN_KEY),
    //   });
    // }
    // return res.status(404).json({ message: 'User not found' });

    // res.send('ok');
  }
}

module.exports = SignInController;