import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { getToken, logout } from './services/authentication.js';
import App from "./App.js"
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./views/Login.js";
import Profile from "./views/Profile.js"
// import Signup from "views/Signup.js";
const history = createBrowserHistory();

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    getToken()? 
    <Component /> : <Navigate to= "/" />
  );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    getToken() && restricted? 
    <Navigate to= "/dashboard" /> : <Component />
  );
};

const LogoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      logout()? 
      <Navigate to= "/" /> : <Component {...props} />
    )} />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Router history={history}>
      <Routes>
          <Route restricted={true} element={<PublicRoute component={Login}/>} path="/" />
          <Route element={<PrivateRoute component={Profile}/>} path="/profile/:id" />
          {/* <PublicRoute restricted={true} component={Signup} path="/signup" /> */}
          {/* <LogoutRoute component={Signin} path="/logout" /> */}
          {/* <PrivateRoute component={AdminLayout} path="/dashboard" /> */}
          {/* <Navigate to="/dashboard"/> */}
      </Routes>
    </Router>
)