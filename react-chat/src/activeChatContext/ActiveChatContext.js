import React, {useContext, useState} from "react";

const ActiveChatContext = React.createContext();

export const useActiveChat = () => {
    return useContext(ActiveChatContext);
};

export const ActiveChatProvider = ({children}) => {
    const [isActiveChat, setIsActiveChat] = useState(false);

    const changeIsActiveChat = (isActive) => {
        setIsActiveChat(isActive);
    };

    return (
        <ActiveChatContext.Provider value={{isActiveChat, changeIsActiveChat}}>
            {children}
        </ActiveChatContext.Provider>
    )
};