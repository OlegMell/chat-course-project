import React from "react";

import "./context-menu.scss"

export const ContextMenu = ({...options}) => {
    console.log(options);
    const {copyText, removeMessage} = options;
    console.log(removeMessage);
    return (
        <div className={'context-menu'} onClick={e => {
            e.stopPropagation()
        }}>
            <ul className={'context-menu-items'}>
                <li className={'context-menu-items__item'}
                    onClick={copyText}
                >Copy text</li>
                <li className={'context-menu-items__item'}
                    onClick={removeMessage}
                >Delete message</li>
            </ul>
        </div>
    )
}