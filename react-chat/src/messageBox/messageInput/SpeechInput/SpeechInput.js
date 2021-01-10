import React from "react";
// const SpeechRecognition = SpeechRecognition;
// const SpeechGrammarList = SpeechGrammarList;
// const SpeechRecognitionEvent = SpeechRecognitionEvent;

export default function SpeechInput({h, speech}) {

  // const clickHandler = () => {
  //   isClicked ?
  //       speech.startListening() :
  //       speech.stopListening();
  //
  //   setIsClicked((isClicked) => !isClicked);
  //   console.log('here');
  // };

  return (
      <button className={'message-box-footer__emoji-btn'}
              onClick={h}>
        <svg width="1em" height="1em" viewBox="0 0 16 16"
             className="bi bi-mic" fill="currentColor"
             xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
          <path fillRule="evenodd"
                d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
        </svg>
      </button>
  )
}