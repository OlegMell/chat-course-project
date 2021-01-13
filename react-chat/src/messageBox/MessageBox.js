import React, {useEffect, useRef, useState} from "react";
import Message from "./message/Message";
import MessageInput from "./messageInput/MessageInput";
import {useActiveChat} from "../activeChatContext/ActiveChatContext";

import './message-box.scss';
import {ContextMenu} from "../ContextMenu/ContextMenu";
import socket from '../socket/socket';

export default function MessageBox({messages, chat, draftMessages, addDraftMessage, removeMessage}) {
    const messagesRef = useRef();
    const {isActiveChat} = useActiveChat();
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [msgId, setMsgId] = useState(null);

    const contextMenuHandler = (msgId) => {
        setIsContextMenuOpen((prev) => !prev);
        setMsgId(msgId);
    }

    const copyText = async () => {
        await navigator.clipboard.writeText(messages.find(msg => msg.id === msgId).content);
        setIsContextMenuOpen(false)
    }

    const removeMessageHandler = () => {
        socket.emit('CHAT:REMOVE_MESSAGE', {chat, msgId})
        removeMessage(chat, msgId)
        setIsContextMenuOpen(false)
    };

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    });

    const mapMessages = () => {
        if (messages.length === 0) {
            return <h6 className={'tooltip-text'}>No messages yet!</h6>
        }
        return messages.map(msg => (<Message contextMenu={contextMenuHandler} key={msg.id} msg={msg}/>))
    }

    return (
        <div className={'message-box'}>
            <main onClick={() => setIsContextMenuOpen(false)}
                  ref={messagesRef}
                  className={'message-box-messages'}>
                {!isContextMenuOpen ||
                <ContextMenu copyText={copyText} removeMessage={removeMessageHandler} position={isContextMenuOpen}/>}
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