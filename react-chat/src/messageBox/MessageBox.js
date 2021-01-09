import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Message from "./message/Message";
import MessageInput from "./messageInput/MessageInput";
import {useActiveChat} from "../activeChatContext/ActiveChatContext";

import socket from "../socket/socket";
import './message-box.scss';


export default function MessageBox({messages, chat, onAddMessage, draftMessages, addDraftMessage}) {
    const messagesRef = useRef();
    const {isActiveChat} = useActiveChat();

    console.log(messages, "MESSAGES");

    // function sendBtnClickHandler() {
    //     socket.emit("SEND_MESSAGE", {
    //         content: inputText,
    //         chatName: chat,
    //         from: localStorage.getItem("user-email")
    //     });
    //     setInputText("");
    // }



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
                    addDraftMessage={addDraftMessage}
                />
            </footer>) : ''}
        </div>
    )
}