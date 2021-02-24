import React, {useContext, useState} from "react";

const SettingsContext = React.createContext();

export const useSettingsContext = () => {
    return useContext(SettingsContext);
};

export const SettingsContextProvider = ({children}) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const changeSettingsOpenState = (isActive) => {
        setIsSettingsOpen(isActive);
    };



    return (
        <SettingsContext.Provider value={{isSettingsOpen, changeSettingsOpenState}}>
            {children}
        </SettingsContext.Provider>
    )
};
