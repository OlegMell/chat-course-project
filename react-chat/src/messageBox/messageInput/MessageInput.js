import React from "react";
import './message-inp.scss';

export default function MessageInput() {
  return (
   <div className={'message-input-box'}>
     <input
         className={'message-input-box__inp'}
         type={'text'}
         placeholder={'Type message...'}
     />
   </div>
  )
}