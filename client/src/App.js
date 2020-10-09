import React, { useState, useEffect } from 'react';
import Signin from "./component/Signin";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core';


function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    if (window.sessionStorage.getItem("id")) {
      setIsLogin(true);
      setEmail(window.sessionStorage.getItem("email"));
      setName(window.sessionStorage.getItem("name"));
    }
  })

  return (
    <div className= "App">
      <Switch>
        <Route path="/signin" render={() => {
          if (isLogin) {
            return <Redirect to="/" />
          } else {
            return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} />
          }
        }} />
        <Route exact path="/signup" render={() => {
          return <Signup />
        }} />
        <Route exact path="/home" render={() => {
          if (isLogin) {
            return <Home />
          }
          return <Redirect to="/signin" />
        }} />
        <Route path="/" render={() => {
          if (isLogin) {
            return <Redirect to="/home" />
          }
          return <Redirect to="/signin" />
        }} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
