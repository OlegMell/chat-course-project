import React, {useReducer} from "react";
import {StateContext} from "./StateContext";
import reducer from "./reducer";
import {initialState} from "./initialState";
import {
    ADD_ALERTED_CHAT, ADD_DRAFT_MESSAGE,
    NEW_MESSAGE,
    SET_CHATS,
    SET_MESSAGES_FOR_ACTIVE_CHAT,
    SHOW_LOADER,
    // SET_I_DATA,
    SET_DATA, UNSET_ACTIVE_CHAT,
    REMOVE_MESSAGE
} from "./types";
import socket from "../socket/socket";


export const StateReducer = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const reload = async () => {
        showLoader();
        // const user = localStorage.getItem("user-email");
        // const res = await fetch(`http://localhost:9999/api/data/state/`, {
        //     method: 'POST',
        //     body: JSON.stringify({user}),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
        // if (res.status === 200) {
        //     const data = await res.json();
        //     console.log(data);
        //     dispatch({
        //         type: SET_I_DATA,
        //         payload: data
        //     })
        // }
        socket.emit('USER:AUTHORIZE', {email: localStorage.getItem('user-email')});
        socket.on('APP:SET_INIT_STATE', data => {
            console.log(data);
            dispatch({
                type: SET_DATA,
                payload: data
            })
        })
    }

    const changeChatsOrder = async (chats) => {
        dispatch({
            type: SET_CHATS,
            payload: chats
        });
    }

    const addMessage = ({chat, message}) => {
        dispatch({
            type: NEW_MESSAGE,
            payload: {chat, message}
        });
    };

    const setMessagesForActiveChat = async ({messages, chatRoom}) => {
        dispatch({
            type: SET_MESSAGES_FOR_ACTIVE_CHAT,
            payload: {
                messages,
                chat: chatRoom
            }
        })
    };

    const addAlertedChat = async ({chatName}) => {
        dispatch({
            type: ADD_ALERTED_CHAT,
            payload: chatName
        })
    }

    const addDraftMessage = async (chat, text) => {
        dispatch({
            type: ADD_DRAFT_MESSAGE,
            payload: {
                chat,
                text
            }
        })
    }

    const unsetActiveChat = () => {
        dispatch({
            type: UNSET_ACTIVE_CHAT
        })
    }

    const removeMessage = (chat, msgId) => {
        dispatch({
            type: REMOVE_MESSAGE,
            payload: {chat, msgId}
        })
    }


    return (
        <StateContext.Provider value={{
            reload, addMessage, setMessagesForActiveChat, changeChatsOrder,
            addAlertedChat, addDraftMessage, unsetActiveChat, removeMessage,
            ...state
        }}>
            {children}
        </StateContext.Provider>
    )
}