import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { getToken, logout } from './services/authentication.js';

import Signin from "./views/Signin.js";
// import Signup from "views/Signup.js";
const history = createBrowserHistory();

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      getToken()? 
        <Component {...props} /> : <Navigate to= "/Signin" />
    )} />
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
      <Navigate to= "/Signin" /> : <Component {...props} />
    )} />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Router history={history}>
      <Routes>
          <Route restricted={true} element={<PublicRoute component={Signin}/>} path="/signin" />
          {/* <PublicRoute restricted={true} component={Signup} path="/signup" /> */}
          {/* <LogoutRoute component={Signin} path="/logout" /> */}
          {/* <PrivateRoute component={AdminLayout} path="/dashboard" /> */}
          {/* <Navigate to="/dashboard"/> */}
      </Routes>
    </Router>
)