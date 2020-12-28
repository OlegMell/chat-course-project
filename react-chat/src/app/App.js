import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from 'react-router-dom';
import PrivateRoute from "../routing/PrivateRoute";
import Chat from "../chat/Chat";
import Auth from "../auth/Auth";
import Alert from "../alert/Alert";
import { AlertProvider } from "../alert/AlertContext";


// export const AlertContext = React.createContext();

function App() {
    return (
        <AlertProvider>
            <Router>
                <div className={'app'}>
                    <Alert/>
                    <Switch>
                        <Route path='/auth'>
                            <Auth/>
                        </Route>
                        <PrivateRoute path='/chat'>
                            <Chat/>
                        </PrivateRoute>
                        <Route path='/'>
                            <Redirect to='/chat'/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </AlertProvider>
    );
}

export default App;
