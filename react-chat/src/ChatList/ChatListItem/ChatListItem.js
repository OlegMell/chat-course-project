import React, {useState} from "react";
import './chat-list-item.scss';


export default function ChatListItem({ dragging, dragged, children, ...rest}) {
  const [isActive, setIsActive] = useState(false);
  const { toggleActiveChat, activeChat } = rest;

  return (
      <div
          className={'list-item'}
          style={children.id === activeChat ? {'backgroundColor': '#f77f00', ...rest.style} : {'backgroundColor': '', ...rest.style}}
          onClick={() => rest.toggleActiveChat(children.id)}
          onContextMenu={e => {e.preventDefault(); alert();}}
      >
        <div className={'img-wrapper'}>
          <img src="./prof.jpg" alt="profile icon"
               className={'profile-img'}/>
        </div>
        <div className="chat-name text-truncate">
          { children.name }
        </div>
      </div>
  )
}