import React from "react";
import './chat-list-item.scss';


export default function ChatListItem({dragging, dragged, children, ...rest}) {
    const {toggleActiveChat, activeChat, existingChats} = rest;
    const currentUserEmail = localStorage.getItem("user-email");

    let res = '';
    const lastMsg = existingChats.find(item => item.chat.name === children.chat.name) || {};

    let lastMsgDate;
    let currentDate;
    if (lastMsg.msg) {
        lastMsgDate = new Date(lastMsg?.msg?.createdAt);
        currentDate = new Date();
    }

    return (
        <div
            className={`list-item ${dragged ? 'dragged' : ''} 
            ${children.chat.name === activeChat ? 'active-chat' : ''} 
            ${lastMsg?.msg?.read ? '' : 'blink'}`}
            style={{...rest.style}}
            onClick={() => toggleActiveChat(children.chat.id)}
            onContextMenu={e => {
                e.preventDefault();
                alert();
            }}
        >
            <div className={'img-wrapper'}>
                <img
                    src={`https://drive.google.com/uc?export=view&id=${children.addressee.image}`}
                    alt="profile icon"
                    className={'profile-img'}/>
            </div>
            <div className={'chat-name-wrapper'}>
                <div className="chat-name text-truncate">
                    {children.addressee.firstname}
                </div>
                <div className={'last-msg'}>
                    <div className={'text-truncate'}>
                        {lastMsg?.msg?.from?.email !== currentUserEmail || 'You: '}{lastMsg?.msg?.content}
                    </div>
                </div>
            </div>
            <div className={'info-box'}>
                <small
                    className={'last-msg-date'}>{!lastMsgDate || (lastMsgDate?.getMonth() === currentDate?.getMonth() ?
                    (`${lastMsgDate?.getHours()}:${lastMsgDate?.getMinutes()}`) :
                    (`${lastMsgDate?.getFullYear()}.${lastMsgDate?.getMonth()} ${lastMsgDate?.getHours()}:${lastMsgDate?.getMinutes()}`))
                }</small>
                {res ? (<div className={'chat-item-badge'}/>) : ''}
                <small>{!lastMsg.msg || (lastMsg?.msg?.read ? 'read' : 'unread')}</small>
            </div>
        </div>
    )
}
