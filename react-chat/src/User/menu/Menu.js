import React from "react";
import {useHistory} from 'react-router-dom';

import "./menu.scss";

export default function Menu({visibility}) {
  let classes = [];
  if (visibility === "hovered") {
    classes.push("hovered");
  }  else if(visibility === "clicked") {
    classes.push("clicked");
  }
  const history = useHistory();
  const exitOption = () => {
    localStorage.removeItem("user");
    history.replace({pathname: '/chat'});
  };

  return (
      <div
          className={ "user-menu " + classes.join(" ") }
      >
        {visibility === "hovered" ? "MENU" : (visibility === "clicked" ? (<ul className={'user-menu-list'}>
          <li className={'user-menu-list__option'}>
            Settings
            <svg width="1em" height="1em" viewBox="0 0 16 16"
                 className="bi bi-grid" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
            </svg>

          </li>
          <li className={'user-menu-list__option'} onClick={exitOption}>
            Exit
            <svg width="1em" height="1em" viewBox="0 0 16 16"
                 className="bi bi-door-closed" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
              <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
            </svg>
          </li>
        </ul>) : "")}

      </div>
  )
}