import React from "react";
import './user.scss';

export default function User() {
  return (
      <div className={'user-box'}>
        {/*<div className="username">oleg.mel123@gmail.com</div>*/}
        <div className="img-wrapper">
          <img src="https://i12.fotocdn.net/s103/a12d1eab1fae2390/gallery_m/2180800419.jpg" alt="user icon"/>
        </div>
      </div>
  )
}