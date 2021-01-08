const AccountService = require('../../services/AccountService');

class StateController {
    static async getInitialState(req, res) {
        const userEmail = req.body.user;

        console.log(userEmail);

        const accountService = new AccountService();
        const user = await accountService.findOne({email: userEmail});

        // const existingChats = await user.getChats({raw: true});
        // existingChats.forEach(chat => {
        //     socket.join(chat.name);
        // });

        const chatsRaw = await user.getChats();

        let chats = [];

        for await (let chat of chatsRaw) {
            const accounts = await chat.getAccounts();
            const addressee = accounts.filter(account => account.email !== user.email)[0];
            chats.push({chat, addressee});
        }





        res.send(JSON.stringify({chats, user: user.dataValues}));
    }
}

module.exports = StateController