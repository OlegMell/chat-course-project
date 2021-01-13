const {server} = require('../config/server');
const io = require('socket.io')(server);
const AccountService = require('../services/AccountService');
// const GoogleDriveService = require('../services/GoogleDriveService');
const ChatService = require('../services/ChatService');
const MessageService = require('../services/MessageService');
const md5 = require('md5');
const usersChats = require('./users');


let activeChatId;
let chatRoom;
let users = [];


io.on('connection', socket => {
    socket.on('USER:AUTHORIZE', (userData) => {
        const accountService = new AccountService();
        accountService.findOne(userData)
            .then(async user => {
                // let g = new GoogleDriveService();
                // const image = g.getImage(user.image);

                const existingChats = await user.getChats();
                existingChats.forEach(chat => {
                    socket.join(chat.name);
                });

                let chatsWithLastMessage = [];
                for await (chat of existingChats) {
                    let msgs = await chat.getMessages({limit: 1, order: [['createdAt', 'DESC']]})
                    if (msgs[0]) {
                        const from = await msgs[0].getFrom({raw: true});
                        const msg = msgs[0].dataValues;
                        msg.from = from;
                        chatsWithLastMessage.push({
                            chat: chat.dataValues,
                            msg
                        })
                    }
                }

                const alertedChats = existingChats.filter(chat => chat.alerted);
                if (!usersChats.has(user.email)) {
                    usersChats.set(user.email, {
                        existingChats: chatsWithLastMessage,
                        activeChat: '',
                        alertedChats,
                        activeChatMessages: {},
                        chats: [],
                        draftMessages: [],
                        socket,
                    })
                } else {
                    usersChats.get(user.email).socket = socket;
                    usersChats.get(user.email).activeChat = null;
                    usersChats.get(user.email).alertedChats = alertedChats;
                    usersChats.get(user.email).chats = [];
                    usersChats.get(user.email).activeChatMessages = {};
                    usersChats.get(user.email).existingChats = chatsWithLastMessage;
                    // usersChats.get(user.email).draftMessages = []
                }


                let isModify = false;
                users.forEach(item => {
                    if (item[user.id]) {
                        item[user.id] = socket;
                        isModify = !isModify;
                    }
                });

                if (!isModify) {
                    users.push({[user.id]: socket});
                }
                const chatsRaw = await user.getChats();

                let chats = [];

                for await (let chat of chatsRaw) {
                    const accounts = await chat.getAccounts();
                    const addressee = accounts.filter(account => account.email !== user.email)[0];
                    chats.push({chat, addressee});
                }

                usersChats.get(user.email).chats = chats;

                const state = {...usersChats.get(user.email), socket: null, user: user.dataValues};

                socket.emit('APP:SET_INIT_STATE', state)
            });
    });

    socket.on('CHAT:UNSET_ACTIVE_CHAT', ({user}) => {
        activeChatId = '';
        usersChats.get(user).activeChat = '';
    });

    socket.on('CHAT:TOGGLE_ACTIVE', ({user, chatId}) => {
        activeChatId = chatId;
        usersChats.get(user).activeChat = chatId;

        const chatService = new ChatService();
        chatService.findOneById(chatId)
            .then(async chat => {
                const messages = await chat.getMessages({include: 'from'});
                for await (msg of messages) {
                    const from = await msg.getFrom();
                    if (from.email !== user) {
                        await msg.update({
                            read: true,
                            where: {
                                read: false
                            }
                        })
                    }
                }
                chatRoom = chat.name;
                socket.join(chatRoom);
                socket.emit('CHAT:TOGGLE_MESSAGES', {messages, chatRoom});
            });
    });

    socket.on('CHAT:REMOVE_ALERTED', async ({chatId}) => {
        console.log(chatId);
        const chatService = new ChatService();
        const chat = await chatService.findOneById(chatId);
        chat.alerted = false;
        await chat.save();
    })

    socket.on('SEND_MESSAGE', async ({content, chatName, from}) => {
        const messageService = new MessageService();
        const _message = await messageService.create({
            content,
            read: false,
            edited: false
        });

        const chatService = new ChatService();
        const currentChat = await chatService.findOneByName(chatName);
        await currentChat.addMessage(_message);

        const currentChatUsers = await currentChat.getAccounts();
        const addressee = currentChatUsers.find(user => user.email !== from);

        if (usersChats.has(addressee.email)) {
            const userChats = usersChats.get(addressee.email);
            if (userChats.activeChat !== currentChat.id) {
                currentChat.alerted = true;
                await currentChat.save();
                userChats.alertedChats.push(chatName)
                usersChats.get(addressee.email).socket.emit("CHAT:ALERT_MESSAGE", {chatName})
            }
        }

        const accountService = new AccountService();
        const sender = await accountService.findOne({email: from});
        await _message.setFrom(sender);

        const senderRawData = await _message.getFrom({raw: true});
        const cMessage = {..._message.dataValues, from: senderRawData};
        io.to(chatName).emit('CHAT:ON_MESSAGE', {
            chat: chatName,
            message: cMessage
        });
    });

    socket.on("CHAT:DRAFT_MESSAGE", ({userEmail, draftMessage, chat}) => {
        if (usersChats.has(userEmail)) {
            const draft = usersChats.get(userEmail).draftMessages.find(draft => draft.chat === chat);
            if (draft) {
                draft.draftMessage = draftMessage;
            } else {
                const draft = {
                    chat,
                    draftMessage
                };
                usersChats.get(userEmail).draftMessages.push(draft);
            }
        }
    });

    socket.on("CHAT:REMOVE_MESSAGE", async ({chat, msgId}) => {
        const messageService = new MessageService();
        await messageService.removeById(msgId);
    });

    socket.on("USERS:SEARCH", (data) => {
        const accountService = new AccountService();
        accountService.findOneByUsername(data).then(res => {
            socket.emit("USERS:SEARCH_RESULT", res);
        })
    });

    socket.on("CHAT:START", ({email, userId}) => {
        const chatService = new ChatService();
        const accountService = new AccountService();
        const chatName = `${email} + ${userId}`;
        chatService.findOneByName(md5(chatName)).then(chat => {
            if (!chat) {
                chatService.create(md5(chatName)).then(async chat => {
                    if (!chat) {
                        socket.emit("CHAT:ERROR_CREATE_CHAT");
                    }

                    const currentUser = await accountService.findOne({email});
                    const addresseeUser = await accountService.readOne(userId);

                    await currentUser.addChat(chat);
                    await addresseeUser.addChat(chat);

                    let chats = [];
                    const chatsRaw = await currentUser.getChats();

                    for await (let chat of chatsRaw) {
                        const accounts = await chat.getAccounts();
                        const addressee = accounts.filter(account => account.email !== email)[0];
                        chats.push({chat, addressee});
                    }

                    socket.emit('USER:SET_CHATS', chats);
                })
            } else {
                socket.emit("CHAT:EXIST");
            }
        });
    });
});

module.exports = io;



