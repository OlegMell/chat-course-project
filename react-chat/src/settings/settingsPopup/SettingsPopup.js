import React, {useEffect, useState} from "react";
import './settings-popup.scss';
import {useSettingsContext} from "../settingsContext/SettingsContext";
import socket from "../../socket/socket";

export default function SettingsPopup() {
    const {isSettingsOpen, changeSettingsOpenState} = useSettingsContext();
    const [settings, setSettings] = useState({data: {}});

    const closeSettingsClickHandler = () => {
        changeSettingsOpenState(!isSettingsOpen);
    }
    const editProfileImageHandler = ({target}) => {
        // if (target.files.length)
        //     socket.emit("APP:CHANGE_PROFILE_IMAGE", target.files[0].file);
        // TODO: send new photo to server
    }

    useEffect(() => {
        if (isSettingsOpen) {
            socket.emit('APP:GET_SETTINGS', localStorage.getItem('user-email'));
        }
    }, [isSettingsOpen])

    useEffect(() => {
        socket.on('APP:GOT_SETTINGS', (settings) => {
            setSettings(settings);
        })

        return () => {
            socket.removeListener('APP:GOT_SETTINGS');
        }
    }, [])

    return (
        <div className={`bg ${isSettingsOpen ? 'active' : 'close'}`} onClick={closeSettingsClickHandler}>
            <div className={`settings-popup `} onClick={(e) => e.stopPropagation()}>
                <header className={'settings-popup-header'}>
                    <h3 className={'settings-popup-header__title'}>Settings</h3>
                    <button className={'settings-popup-header__close-btn'} onClick={closeSettingsClickHandler}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle"
                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fillRule="evenodd"
                                  d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"/>
                        </svg>
                    </button>
                </header>
                <main className={'settings-popup-main'}>
                    <section className={'settings-popup-main__section'}>
                        <h6 className={'settings-popup-main__section-title'}>Personal Info</h6>
                        <div className={'settings-popup-main__section-item profile-img'}>
                            <div className={'settings-popup-main__section-item-profile-img__wrapper'}>
                                <img
                                    className={'settings-popup-main__section-item-profile-img__wrapper-img'}
                                    src={`https://drive.google.com/uc?export=view&id=${settings.data.image}`}
                                    alt="profile"/>
                                <div className="editor" onClick={editProfileImageHandler}>
                                    <label>
                                        <input type="file" onChange={editProfileImageHandler}/>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={'settings-popup-main__section-item'}>
                            <div className={'settings-popup-main__section-item-title'}>
                                First name:
                            </div>
                            <div className={'settings-popup-main__section-item__inp-wrapper'}>
                                {settings.data.firstname}
                                {/*<input value={settings !== null ? settings.data.firstname : ''}*/}
                                {/*       className={'settings-popup-main__section-item__inp-wrapper__inp form-control'}*/}
                                {/*       type="text"/>*/}
                            </div>
                        </div>

                        <div className={'settings-popup-main__section-item'}>
                            <div className={'settings-popup-main__section-item-title'}>
                                Last name:
                            </div>
                            <div className={'settings-popup-main__section-item__inp-wrapper'}>
                                {settings.data.lastname}
                                {/*<input value={settings !== null ? settings?.data?.lastname : ''}*/}
                                {/*       className={'settings-popup-main__section-item__inp-wrapper__inp form-control'}*/}
                                {/*       type="text"/>*/}
                            </div>
                        </div>
                        <div className={'settings-popup-main__section-item'}>
                            <div className={'settings-popup-main__section-item-title'}>
                                Username:
                            </div>
                            <div className={'settings-popup-main__section-item__inp-wrapper'}>
                                @{settings.data.username}
                                {/*<input className={'settings-popup-main__section-item__inp-wrapper__inp form-control'}*/}
                                {/*       type="text"/>*/}
                            </div>
                        </div>
                        <div className={'settings-popup-main__section-item'}>
                            <div className={'settings-popup-main__section-item-title'}>
                                Email:
                            </div>
                            <div className={'settings-popup-main__section-item__inp-wrapper'}>
                                {settings.data.email}
                                {/*<input className={'settings-popup-main__section-item__inp-wrapper__inp form-control'}*/}
                                {/*       type="email"/>*/}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
