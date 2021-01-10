import React, {useState} from "react";

import './contacts.scss';

// import {web} from "../../client_secret.json";
import socket from "../../socket/socket";

export default function Contacts({isOpen}) {
  const [contacts, setContacts] = useState();

  // const googleClickHandler = async () => {
  //   await fetch(`${web.auth_uri}?scope=https://www.google.com/m8/feeds&access_type=offline&include_granted_scopes=true&redirect_uri=${web.redirect_uris[0]}&response_type=code&client_id=${web.client_id}`);
  // };

  const onFindUser = ({target}) => {
    if (target.value !== '') {
      socket.emit("USERS:SEARCH", target.value);
      socket.on("USERS:SEARCH_RESULT", (res) => {
        if (!res) setContacts({message: "user not found"});
        else setContacts(res);
      });
    }
  };

  const onUserItemClicked = userId => {
    socket.emit("CHAT:START", {email: localStorage.getItem("user-email"), userId});
    socket.on("CHAT:EXIST", () => {
      console.log("chat exist");
    });
  };

  return (
      <div className={'contacts'} style={{display: isOpen ? "block": "none"}}>
        <header className={'contacts__header'}>
          <input className={'contacts__header-search search-inp'}
                 placeholder={'Find contacts by username..'}
                 type="text"
                 onKeyUp={onFindUser}/>
          {/*<button onClick={googleClickHandler}>google</button>*/}
        </header>
        <main className={'contacts__main-list'}>
          {contacts ?
              (contacts.message || contacts.map(contact =>
                  (<div onClick={() => onUserItemClicked(contact.id)} key={contact.id} className={'contacts__main-list-item'}>
                    <div className={'contact-image-wrapper'}>
                      <img className={'contact-image'}
                           src={`https://drive.google.com/uc?export=view&id=${contact.image}`}
                            alt={'profile'}
                      />
                    </div>
                    {contact.firstname} {contact.lastname}
                  </div>))) :
              ''}
        </main>
        <footer className={'contacts-footer'}>
          <div className="corner"></div>
        </footer>
      </div>
  )
}