import React from "react";
import './message.scss';

export default function Message({contextMenu, msg}) {
    let style;
    if (msg.from.email === localStorage.getItem('user-email')) {
        style = {'alignSelf': 'flex-end'};
    } else {
        style = {'alignSelf': 'flex-start', 'borderRadius': '25px 10px 10px 0'};
    }


    const date = new Date(msg.createdAt);
    const currentDate = new Date();

    return (
        <div className={'message'} style={style} onContextMenu={e => {
            e.preventDefault();
            contextMenu(msg.id);
        }}>
            <header className={'message-header'}>
                {`${msg.from.firstname} ${msg.from.lastname}`}
            </header>
            <main className={'message-content'}>
                {msg.content}
            </main>
            <footer className={'message-footer'}>
                {date.getMonth() === currentDate.getMonth() ?
                    (`${date.getHours()}:${date.getMinutes()}`) :
                    (`${date.getFullYear()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`)
                }
            </footer>
        </div>
    )
}
