import React, {useEffect, useState} from "react";
import User from "./User/User";
import SearchBar from "./SearchBar/SearchBar";
import ChatList from "./ChatList/ChatList";
import MessageBox from "./messageBox/MessageBox";
import {MessagesProvider} from "./messages/messagesContext";
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import socket from "./socket";
import './chat.scss';

export default function Chat() {
  const [chats, setChats] = useState([]);

  window.socket = socket;
  useEffect(() => {
    socket.emit('USER:AUTHORIZE', {email: 'oleg.mel123@gmail.com'});
    socket.on('USER:SET_CHATS', chats => {
      setChats(chats);
    });
    // socket.on('NEW_MESSAGE', () =>{});
  }, []);


  return (
      <div className={'chat-box vh-100'}>
        <div className="nav nav-bar vh-10 header">
          <div className="title">Messages</div>
          <div className={'search-user-wrapper'}>
            <SearchBar/>
            <User/>
          </div>
        </div>
        <div className="m-0">
          <MessagesProvider>
            <SplitterLayout
                horizontal
                primaryIndex={0}
                primaryMinSize={250}
                secondaryMinSize={500}
                secondaryInitialSize={1100}
            >
              <ChatList chats={chats} setChats={setChats} />
              <MessageBox/>
            </SplitterLayout>
          </MessagesProvider>
        </div>
      </div>
  )
}