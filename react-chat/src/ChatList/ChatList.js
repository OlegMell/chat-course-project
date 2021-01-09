import React, {useState} from "react";
import SortableList from "react-sortable-dnd-list";
import ChatListItem from "./ChatListItem/ChatListItem";
import AddChatBtn from "./AddChatBtn/AddChatBtn";
import Contacts from "./Contacts/Contacts";
import {useActiveChat} from "../activeChatContext/ActiveChatContext";

import socket from "../socket/socket";
import './chat-list.scss';


export default function ChatList({
                                     chats,
                                     activeChat,
                                     setChats,
                                     alertedChats,
                                 }) {
    const [isContactsOpened, setIsContactsOpened] = useState(false);
    const {changeIsActiveChat} = useActiveChat();

    const toggleActiveChat = chatId => {
        changeIsActiveChat(true);
        const user = localStorage.getItem("user-email");
        socket.emit('CHAT:TOGGLE_ACTIVE', {user, chatId});
    };

    const addChatBtnClickHandler = () => {
        setIsContactsOpened(prevIsContactsOpened => !prevIsContactsOpened);
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