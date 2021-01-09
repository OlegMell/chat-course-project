import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Message from "./message/Message";
import MessageInput from "./messageInput/MessageInput";
import {useActiveChat} from "../activeChatContext/ActiveChatContext";

import socket from "../socket/socket";
import './message-box.scss';
import {Loader} from "../Loader";


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

    const mapMessages = () => {
        return messages.map(msg => (<Message key={msg.id} msg={msg}/>))
    }

    return (
        <div className={'message-box'}>
            <main ref={messagesRef} className={'message-box-messages'}>
                {!isActiveChat ? <h5 className={'tooltip-text'}>Select a chat to start messaging</h5> : mapMessages()}
            </main>
            {isActiveChat ? (<footer className={'message-box-footer'}>
                <MessageInput
                    draftMessages={draftMessages || []}
                    chat={chat}
                    addDraftMessage={addDraftMessage}
                />
            </footer>) : ''}
        </div>
    )
}