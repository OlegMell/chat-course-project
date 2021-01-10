import React, {useEffect, useRef, useState} from "react";
import Picker from "emoji-picker-react";
import SpeechInput from "./SpeechInput/SpeechInput";
import SpeechRecognition /*{useSpeechRecognition}*/ from 'react-speech-recognition';

import socket from "../../socket/socket";
import './message-inp.scss';


export default function MessageInput({draftMessages, chat, addDraftMessage}) {
    // const {transcript, resetTranscript} = useSpeechRecognition();
    // const [isSpeechClicked, setIsSpeechClicked] = useState(false);
    // const draft = draftMessages.find(draft => draft.chat === chat) || {};
    const [tmpText, setTmpText] = useState('');
    const [isEmojiBtnClicked, setIsEmojiBtnClicked] = useState('');
    const [cursorPos, setCursorPos] = useState(0);
    const inpRef = useRef(null);

    const onEmojiClick = (event, emojiObject) => {
        const textArray = tmpText.split('');
        textArray.splice(cursorPos, 0, String.fromCodePoint(parseInt(emojiObject.unified, 16)));
        setTmpText(textArray.join(''));
        setCursorPos((prevCursorPos) => prevCursorPos += 2);
    };

    const onSpeechClicked = () => {
        SpeechRecognition.startListening();
        // setIsSpeechClicked(!isSpeechClicked);
    };

    const sendBtnClick = () => {
        socket.emit("SEND_MESSAGE", {
            content: tmpText,
            chatName: chat,
            from: localStorage.getItem("user-email")
        });
        setTmpText('')
    };

    const enterClickHandler = (e) => {
        if (e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            sendBtnClick();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', enterClickHandler)

        return () => {
            document.removeEventListener('keydown', enterClickHandler)
        }
    }, [chat, tmpText])

    return (
        <div className={'message-input-box'}>
            <SpeechInput h={onSpeechClicked} speech={SpeechRecognition}
                         st={setTmpText}/>
            <button onClick={() => setIsEmojiBtnClicked(!isEmojiBtnClicked)}
                    className={'message-box-footer__emoji-btn'}>
                <svg width="1em" height="1em" viewBox="0 0 16 16"
                     className="bi bi-emoji-smile" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fillRule="evenodd"
                          d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"/>
                    <path
                        d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                </svg>
            </button>
            {!isEmojiBtnClicked || (
                <Picker onEmojiClick={onEmojiClick}/>
            )}
            {/*{transcript}*/}
            <textarea ref={inpRef}
                      value={tmpText}
                      onChange={() => {
                          setTmpText(inpRef.current.value)
                          addDraftMessage(chat, tmpText);
                          socket.emit("CHAT:DRAFT_MESSAGE", {
                              userEmail: localStorage.getItem("user-email"),
                              draftMessage: inpRef.current.value,
                              chat
                          })
                      }}
                      onFocus={() => setCursorPos(inpRef.current.selectionStart)}
                      onKeyUp={() => setCursorPos(inpRef.current.selectionStart)}
                      className={'message-input-box__inp'}
                      placeholder={'Type message...'}
            />
            <button
                className={'sendBtn btn btn-success'}
                onClick={sendBtnClick}
            >Send
            </button>
        </div>
    )
}