import
  React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch
} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {useAlert} from '../alert/AlertContext';

import './auth.scss';

export default function Auth() {
  let {path, url} = useRouteMatch();
  let history = useHistory();

  const {userNotAuthorize} = useAlert();

  async function f(userData) {
    let data = JSON.stringify(userData);
    fetch('http://localhost:9999/api/auth/sign-in/', {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      if (res.status === 200) {
        const { token, login } = await res.json();
        localStorage.setItem('user', JSON.stringify(token));
        localStorage.setItem('user-email', login);
        history.replace({pathname: '/chat'});
      } else if (res.status === 404) {
        userNotAuthorize(await res.json());
      }
    }).catch((err) => {
      console.log('LOL^^ ', err);
    })
  }

  return (
      <Router>
        <div
            className="container-sm vh-100 d-flex justify-content-center align-items-center">
          <div
              className={'row h-50 w-100 rounded-lg bg-backdrop align-items-center'}>
            <div className="col p-3">
              <h1 className={'title'}>Messages</h1>
              <p className={'text-size'}>
                <Link to={`${url}/sign-up`}>Create account</Link>
                <br/> or <Link to={`${url}/sign-in`}>log in</Link></p>
            </div>
            <div className="col p-3 h-100">
              <Switch>
                <Route path={`${path}/sign-in`}>
                  <SignIn cb={f}/>
                </Route>
                <Route path={`${path}/sign-up`}>
                  <SignUp/>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
  )
}