import React, {useEffect, useReducer, useState} from "react";
import SplitterLayout from 'react-splitter-layout';

import User from "../User/User";
import SearchBar from "../searchBar/SearchBar";
import ChatList from "../ChatList/ChatList";
import MessageBox from "../messageBox/MessageBox";
import {ActiveChatProvider} from "../activeChatContext/ActiveChatContext";
import {
    ADD_ALERTED_CHAT,
    NEW_MESSAGE, REMOVE_ALERTED_CHAT, SET_ACTIVE_CHAT,
    SET_CHATS,
    SET_MESSAGES_FOR_ACTIVE_CHAT
} from "../store/types";
import socket from "../socket/socket";
import reducer from "../store/reducer";

import 'react-splitter-layout/lib/index.css';
import './chat.scss';


export default function Chat() {
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState({});
    const [state, dispatch] = useReducer(reducer, {
        chats: [],
        activeChat: '',
        activeChatMessages: {},
        alertedChats: []
    });

    window.socket = socket;

    useEffect(() => {
        socket.emit('USER:AUTHORIZE', {email: localStorage.getItem("user-email")});
        socket.on("USER:SET_USER", user => setUser(user));
        socket.on('USER:SET_CHATS', chats => {
            dispatch({
                type: SET_CHATS,
                payload: chats
            })
        });
    }, []);

    const addMessage = ({chat, message}) => {
        dispatch({
            type: NEW_MESSAGE,
            payload: {chat, message}
        });
    };

    const setMessagesForActiveChat = ({messages, chatRoom}) => {
        dispatch({
            type: SET_MESSAGES_FOR_ACTIVE_CHAT,
            payload: {
                messages,
                chat: chatRoom
            }
        });

        dispatch({
            type: SET_ACTIVE_CHAT,
            payload: chatRoom
        });

        dispatch({
            type: REMOVE_ALERTED_CHAT,
            payload: chatRoom
        })
    };

    const addAlertedChat = ({chatName}) => {
        console.log(chatName);
        dispatch({
            type: ADD_ALERTED_CHAT,
            payload: chatName
        })
    }

    return (
        <div className={'chat-box vh-100'}>
            <div className="nav nav-bar vh-10 header">
                <div className="title">Messages</div>
                <div className={'search-user-wrapper'}>
                    {state.activeChat}
                    <SearchBar/>
                    {!user.dataValues || (<User photo={user.dataValues.image}/>)}
                </div>
            </div>
            <div className="m-0">
                {/*<MessagesProvider>*/}
                <ActiveChatProvider>
                    <SplitterLayout
                        horizontal
                        primaryIndex={0}
                        primaryMinSize={250}
                        secondaryMinSize={500}
                        secondaryInitialSize={1100}
                    >
                        <ChatList toggleChat={setMessagesForActiveChat}
                                  chats={state.chats}
                                  setChats={setChats}
                                  alertedChats={state.alertedChats}
                                  addAlertedChat={addAlertedChat}/>
                        <MessageBox
                            messages={state.activeChatMessages[state.activeChat] || []}
                            chat={state.activeChat}
                            onAddMessage={addMessage}/>
                    </SplitterLayout>
                </ActiveChatProvider>
                {/*</MessagesProvider>*/}
            </div>
        </div>
    )
}