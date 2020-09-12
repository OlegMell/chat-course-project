import React, {useContext, useState} from "react";

const MessagesContext = React.createContext();

export const useMessages = () => {
  return useContext(MessagesContext);
};

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const changeMessages = currMessages => {
    // console.log(currMessages);
    setMessages(currMessages);
  };

  return (
      <MessagesContext.Provider value={ {messages, changeMessages} }>
        { children }
      </MessagesContext.Provider>
  )
};