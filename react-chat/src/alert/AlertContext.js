import React, {useContext, useState} from "react";

const AlertContext = React.createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const userNotAuthorize = text => {
    setAlert(!alert);
    setAlertText(text.message);
  };

  return (
      <AlertContext.Provider value={ {alert, alertText, userNotAuthorize} }>
        { children }
      </AlertContext.Provider>
  )
};