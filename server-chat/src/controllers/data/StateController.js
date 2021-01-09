const AccountService = require('../../services/AccountService');
const usersChats = require('./../../sockets/users');

class StateController {
    static async getInitialState(req, res) {
        const userEmail = req.body.user;

        const accountService = new AccountService();
        const user = await accountService.findOne({email: userEmail});

        const chatsRaw = await user.getChats();
        let chats = [];

        for await (let chat of chatsRaw) {
            const accounts = await chat.getAccounts();
            const addressee = accounts.filter(account => account.email !== user.email)[0];
            chats.push({chat, addressee});
        }

        usersChats.set(user.email, {
            existingChats: [],
            activeChat: '',
            alertedChats: [],
            activeChatMessages: {},
            chats,
            draftMessages: [],
            socket: null,
        })

        res.send(JSON.stringify({chats, user: user.dataValues}));
    }
}

module.exports = StateController