import * as types from './types';

export default (state, action) => {
  switch (action.type) {
    case types.SET_DATA:
      return {
        ...state,
        ...action.payload
      };

    case types.SET_ACTIVE_CHAT:
      return {
        ...state,
        activeChat: action.payload
      };

    case types.SET_MESSAGES_FOR_ACTIVE_CHAT:
      return {
        ...state,
        activeChatMessages: {
          ...state.activeChatMessages,
          [action.payload.chat]: action.payload.messages
        }
      };


    case types.SET_CHATS:
      return {
        ...state,
        chats: action.payload
      };

    case types.NEW_MESSAGE: {
      return {
        ...state,
        activeChatMessages: {
          ...state.activeChatMessages,
          [action.payload.chat]: [...state.activeChatMessages[action.payload.chat] || [action.payload.chat] , action.payload.message]
        }
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


    case types.REMOVE_ALERTED_CHAT:
      return  {
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
            ...action.payload
        ]
      }

    default:
      return state;
  }

}