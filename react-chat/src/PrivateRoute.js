import React from "react";
import {
  Route,
  Redirect
} from 'react-router-dom';


export default function PrivateRoute({children, ...rest}) {
  return (
      <Route {...rest} render={() =>
          localStorage.getItem('user') !== null ? (
              children
          ) : (
              <Redirect
                  to={{
                    pathname: "/auth"
                  }}
              />
          )
      }
      />
  )
}