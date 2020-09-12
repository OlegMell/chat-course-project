import React from "react";
import './message.scss';

export default function Message({msg}) {
  console.log(msg);

  let style;
  console.log(msg.from.email);
  if (msg.from.email === localStorage.getItem('user-email')) {
    style = {'alignSelf': 'flex-end'};
  } else {
    style = {'alignSelf': 'flex-start'};
  }

  return (
      <div className={'message'} style={style}  onContextMenu={e => {e.preventDefault(); alert();}}>
        <header className={'message-header'}>
          { `${msg.from.firstname} ${msg.from.lastname}` }
        </header>
        {msg.content}
        <footer className={'message-footer'}>
          {msg.createdAt}
        </footer>
      </div>
  )
}