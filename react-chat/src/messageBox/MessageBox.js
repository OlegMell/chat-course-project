import React, {useEffect, useRef, useState} from "react";
import Message from "./message/Message";
import MessageInput from "./messageInput/MessageInput";
import {useActiveChat} from "../activeChatContext/ActiveChatContext";

import socket from "../socket/socket";
import './message-box.scss';


export default function MessageBox({messages, chat, onAddMessage, draftMessages, dispatch}) {
    // const [inputText, setInputText] = useState('');
    const messagesRef = useRef();
    const {isActiveChat} = useActiveChat();

    // function sendBtnClickHandler() {
    //     socket.emit("SEND_MESSAGE", {
    //         content: inputText,
    //         chatName: chat,
    //         from: localStorage.getItem("user-email")
    //     });
    //     setInputText("");
    // }

    useEffect(() => {
        socket.on('CHAT:ON_MESSAGE', onAddMessage);
    }, []);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    });

    return (
        <div className={'message-box'}>
            <main ref={messagesRef} className={'message-box-messages'}>
                {messages.map(msg => (<Message key={msg.id} msg={msg}/>))}
            </main>
            {isActiveChat ? (<footer className={'message-box-footer'}>
                <MessageInput
                    // text={inputText}
                    // setText={setInputText}
                    draftMessages={draftMessages || []}
                    chat={chat}
                    dispatch={dispatch}
                />
            </footer>) : ''}
        </div>
    )
}