import React from "react";

import "./context-menu.scss"

export const ContextMenu = () => {
    return (
        <div className={'context-menu'} onClick={e => {
            e.stopPropagation()
        }}>
            <ul className={'context-menu-items'}>
                <li className={'context-menu-items__item'}>Copy text</li>
                <li className={'context-menu-items__item'}>Delete message</li>
            </ul>
        </div>
    )
}