import React, {useEffect, useState} from "react";
import SortableList from "react-sortable-dnd-list";
import ChatListItem from "./ChatListItem/ChatListItem";
import AddChatBtn from "./AddChatBtn/AddChatBtn";
import Contacts from "./Contacts/Contacts";
import {useActiveChat} from "../activeChatContext/ActiveChatContext";
import {ADD_ALERTED_CHAT} from "../store/types";

import socket from "../socket/socket";
import './chat-list.scss';


export default function ChatList({toggleChat, chats, setChats, alertedChats, addAlertChat}) {
  const [activeChat, setActiveChat] = useState(null);
  const [isContactsOpened, setIsContactsOpened] = useState(false);
  const {changeIsActiveChat} = useActiveChat();

  const toggleActiveChat = chatId => {
    changeIsActiveChat(true);
    setActiveChat(chatId);
    socket.emit('CHAT:TOGGLE_ACTIVE', chatId);
  };

  useEffect(() => {
    socket.on('CHAT:TOGGLE_MESSAGES', toggleChat);
  }, []);

  useEffect(() => {
    socket.on('CHAT_ALERT_MESSAGE', (chatName) => {
      addAlertChat({
        type: ADD_ALERTED_CHAT,
        payload: chatName
      })
    })
  }, []);

  const addChatBtnClickHandler = () => {
    setIsContactsOpened((isContactsOpened) => {
      return !isContactsOpened;
    });
  };


  return (
      <div className={'chat-list-box pt-2'}>
        {chats.length === 1 ?
            (<ChatListItem children={{...chats[0]}}
                           toggleActiveChat={toggleActiveChat}
                           activeChat={activeChat}
                           alertedChats={alertedChats}/>) :
            (<SortableList
                itemComponent={ChatListItem}
                value={chats}
                onChange={setChats}
                itemComponentProps={{
                  toggleActiveChat,
                  activeChat,
                  alertedChats
                }}
            />)}
        <div className={'chat-list-box__footer'}>
          <div className={'chat-list-box__footer-wrapper'}>
            <AddChatBtn clickHandler={addChatBtnClickHandler}/>
            <Contacts isOpen={isContactsOpened}/>
          </div>
        </div>
      </div>
  )
}