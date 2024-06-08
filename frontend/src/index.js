import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,Redirect} from "react-router-dom";
import { getToken, logout } from 'Services/authentication';

import Signin from "views/Signin.js";

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      getToken()? 
        <Component {...props} /> : <Redirect to= "/Signin" />
    )} />
  );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      getToken() && restricted? 
      <Redirect to= "/dashboard" /> : <Component {...props} />
    )} />
  );
};

const LogoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      logout()? 
      <Redirect to= "/Signin" /> : <Component {...props} />
    )} />
  );
};