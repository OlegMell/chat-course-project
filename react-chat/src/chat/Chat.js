import React, {useContext, useEffect} from "react";
import SplitterLayout from 'react-splitter-layout';

import User from "../User/User";
import SearchBar from "../searchBar/SearchBar";
import ChatList from "../ChatList/ChatList";
import MessageBox from "../messageBox/MessageBox";
import {ActiveChatProvider} from "../activeChatContext/ActiveChatContext";
import {Loader} from "../Loader";
import {StateContext} from "../store/StateContext";

import socket from "../socket/socket";

import 'react-splitter-layout/lib/index.css';
import './chat.scss';
import {useSettingsContext} from "../settings/settingsContext/SettingsContext";
import SettingsPopup from "../settings/settingsPopup/SettingsPopup";

export default function Chat() {
    const {
        reload,
        activeChatMessages,
        activeChat,
        user,
        alertedChats,
        draftMessages,
        chats,
        addAlertedChat,
        changeChatsOrder,
        addMessage,
        setMessagesForActiveChat,
        addDraftMessage,
        loading,
        unsetActiveChat,
        removeMessage,
        existingChats,
        readMessage,
        updateChatList
    } = useContext(StateContext);

    const {isSettingsOpen} = useSettingsContext()

    useEffect(() => {
        reload();
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        socket.on('CHAT:ON_MESSAGE', ({chat, msg}) => {
            addMessage({chat, msg});
        });
        socket.on('CHAT:TOGGLE_MESSAGES', setMessagesForActiveChat);
        socket.on('CHAT:ALERT_MESSAGE', addAlertedChat);
        socket.on('MESSAGE:READ', readMessage);
        //eslint-disable-next-line
    }, []);


    return (
        <>
            {loading ? <Loader/>
                : (<>
                    {isSettingsOpen ? <SettingsPopup/> : ''}
                    <div className={'chat-box vh-100'}>
                        <div className="nav nav-bar vh-10 header">
                            <div className="title">Messages</div>
                            <div className={'search-user-wrapper'}>
                                <SearchBar/>
                                {!user || (<User photo={user.image}/>)}
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
                                              chats={chats}
                                              activeChat={activeChat}
                                              setChats={changeChatsOrder}
                                              alertedChats={alertedChats}
                                              addAlertedChat={addAlertedChat}
                                              unsetActiveChat={unsetActiveChat}
                                              existingChats={existingChats}
                                              updateChatList={updateChatList}
                                    />
                                    <MessageBox
                                        messages={activeChatMessages[activeChat]?.messages || []}
                                        chat={activeChat}
                                        draftMessages={draftMessages || []}
                                        onAddMessage={addMessage}
                                        addDraftMessage={addDraftMessage}
                                        removeMessage={removeMessage}
                                    />
                                </SplitterLayout>
                            </ActiveChatProvider>
                            {/*</MessagesProvider>*/}
                        </div>
                    </div>
                </>)
            }
        </>
    )
}
