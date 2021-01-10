import React, {useEffect, useRef} from "react";
import Message from "./message/Message";
import MessageInput from "./messageInput/MessageInput";
import {useActiveChat} from "../activeChatContext/ActiveChatContext";

import './message-box.scss';

export default function MessageBox({messages, chat, draftMessages, addDraftMessage}) {
    const messagesRef = useRef();
    const {isActiveChat} = useActiveChat();

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    });

    const mapMessages = () => {
        if (messages.length === 0) {
            return <h6 className={'tooltip-text'}>No messages yet!</h6>
        }
        return messages.map(msg => (<Message key={msg.id} msg={msg}/>))
    }

    return (
        <div className={'message-box'}>
            <main ref={messagesRef} className={'message-box-messages'}>
                {!isActiveChat ? <h6 className={'tooltip-text'}>Select a chat to start messaging</h6> : mapMessages()}
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