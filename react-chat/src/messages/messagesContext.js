import React, {useContext, useState} from "react";

const MessagesContext = React.createContext();

export const useMessages = () => {
  return useContext(MessagesContext);
};

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState('');

  const changeMessages = ({messages, chatRoom}) => {
    setMessages(messages);
    setChat(chatRoom);
  };

  return (
      <MessagesContext.Provider value={ {messages, chat, changeMessages} }>
        { children }
      </MessagesContext.Provider>
  )
};