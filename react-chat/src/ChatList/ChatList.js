import React, {useEffect, useState} from "react";
import ChatListItem from "./ChatListItem/ChatListItem";
import {useMessages} from "../messages/messagesContext";
import socket from "../socket";
import './chat-list.scss';
import SortableList from "react-sortable-dnd-list";

export default function ChatList({chats, setChats}) {
  const [activeChat, setActiveChat] = useState(null);

  const {changeMessages} = useMessages();

  const toggleActiveChat = chatId => {
    setActiveChat(chatId);
    socket.emit('CHAT:TOGGLE_ACTIVE', chatId);
  };

  useEffect(() => {
    socket.on('CHAT:TOGGLE_MESSAGES', changeMessages);
  });

  return (
      <div className={'chat-list-box pt-2'}>
        <SortableList
            itemComponent={ChatListItem}
            value={chats}
            onChange={setChats}
          itemComponentProps={{toggleActiveChat, activeChat}}
        />
      </div>
  )
}