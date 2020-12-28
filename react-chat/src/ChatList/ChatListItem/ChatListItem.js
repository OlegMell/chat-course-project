import React, {useState} from "react";
import './chat-list-item.scss';
// import {useActiveChat} from "../../activeChatContext/ActiveChatContext";


export default function ChatListItem({dragging, dragged, children, ...rest}) {
  // const [isActive, setIsActive] = useState(false);
  const {toggleActiveChat, activeChat, alertedChats} = rest;


  let res = '';
  if (alertedChats.length > 0) {
    res = alertedChats.find(chat => chat === children.chat.name);
  }

  return (
      <div
          className={'list-item'}
          style={
            children.chat.id === activeChat ?
                {'backgroundColor': '#f77f00', ...rest.style} :
                {'backgroundColor': '', ...rest.style}
          }
          onClick={() => rest.toggleActiveChat(children.chat.id)}
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
          {res ? (<div className={'chat-item-badge'}/>) : ''}
        </div>
      </div>
  )
}