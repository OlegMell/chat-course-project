import * as types from './types';

export default (state, action) => {
    switch (action.type) {
        case types.SET_DATA:
            return {
                ...state,
                ...action.payload,
                loading: false
            };

        case types.SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.payload
            };

        // case types.SET_MESSAGES_FOR_ACTIVE_CHAT:
        //   return {
        //     ...state,
        //     activeChatMessages: {
        //       ...state.activeChatMessages,
        //       [action.payload.chat]: action.payload.messages
        //     }
        //   };

        case types.SET_MESSAGES_FOR_ACTIVE_CHAT:
            return {
                ...state,
                // activeChatMessages: {
                //     ...state.activeChatMessages,
                //     [action.payload.chat]: action.payload.messages
                // },
                activeChatMessages: {
                    ...state.activeChatMessages,
                    [action.payload.chat.name]: {
                        chat: action.payload.chat,
                        messages: action.payload.messages
                    }
                },
                existingChats: [...state.existingChats.filter(item => item.chat.name !== action.payload.chat.name), {
                    chat: action.payload.chat,
                    msg: action.payload.messages[action.payload.messages.length - 1],
                }],
                activeChat: action.payload.chat.name,
                alertedChats: [
                    ...state.alertedChats.filter(chat => chat !== action.payload.chat.name)
                ]
            }


        case types.SET_CHATS:
            return {
                ...state,
                chats: action.payload,
                loading: false
            };

        case types.NEW_MESSAGE: {
            let messages = [];
            if (state.activeChatMessages[action.payload.chat.name] && state.activeChatMessages[action.payload.chat.name].messages) {
                messages = [...state.activeChatMessages[action.payload.chat.name].messages];
            }

            // let fc = state.existingChats.find(item => item.chat.name === action.payload.chat.name);


            return {
                ...state,
                activeChatMessages: {
                    ...state.activeChatMessages,
                    [action.payload.chat.name]: {
                        chat: action.payload.chat,
                        messages: [...messages, action.payload.msg]
                    }
                },
                existingChats: [...state.existingChats.filter(item => item.chat.name !== action.payload.chat.name), action.payload]
            };
        }

        case types.ADD_ALERTED_CHAT:
            return {
                ...state,
                alertedChats: [
                    ...state.alertedChats,
                    action.payload
                ]
            };


        case types.READ_MESSAGE: {
            return {
                ...state,
                existingChats: [
                    ...state.existingChats.map(item => {
                        if (item.msg.id === action.payload.msg.id) item.msg = action.payload.msg
                        return item;
                    })
                ]
            }
        }

        case types.REMOVE_ALERTED_CHAT:
            return {
                ...state,
                alertedChats: [
                    ...state.alertedChats.filter(chat => chat !== action.payload)
                ]
            };

        case types.ADD_DRAFT_MESSAGE:
            return {
                ...state,
                draftMessages: [
                    ...state.draftMessages,
                    action.payload
                ]
            }
        case types.SHOW_LOADER:
            return {
                ...state,
                loading: true
            }

        case types.SET_I_DATA:
            return {
                ...state,
                chats: action.payload.chats,
                user: action.payload.user,
                loading: false
            }

        case types.UNSET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: null
            }

        case types.REMOVE_MESSAGE:
            return {
                ...state,
                activeChatMessages: {
                    ...state.activeChatMessages,
                    [action.payload.chat]: {
                        ...state.activeChatMessages[action.payload.chat],
                        messages: state.activeChatMessages[action.payload.chat].messages.filter(item => item.id !== action.payload.msgId)
                    }
                }
            }

        case types.UPDATE_CHAT_LIST:
            return {
                ...state,
                existingChats: [
                    ...state.existingChats,
                    {chat: action.payload.chat, msg: {}}
                ]
            }

        default:
            return state;
    }

}
