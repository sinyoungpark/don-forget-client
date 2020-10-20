import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Intro from "./component/Intro";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Nav from "./component/Nav";
import MyPage from './component/MyPage';
import "./App.scss"
import { CSSTransitionGroup } from "react-transition-group";
import Schedule from "./component/Schedule";
import Search from './component/Search';
import cookie from 'react-cookies'



function App(props) {

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("id") || document.cookie) {
      setIsLogin(true);
      setUserId(window.sessionStorage.getItem("id"));
      setEmail(window.sessionStorage.getItem("email"));
      setName(window.sessionStorage.getItem("name"));
      console.log(userId);
    }
  })

  console.log(props.location.pathname);
  console.log(isLogin)
  console.log(email, name);

  return (
    <div className="App">
      <Nav />
            <div className={props.location.pathname === "/intro" ? "background" : props.location.pathname === "/signin" || props.location.pathname === "/signup" ? "fullBackground" : "sideBackground"}>
              <Switch>
                <Route exact path="/intro" render={() => {
                  return <Intro />
                }} />
                <Route path="/signin" render={() => {
                  if (window.sessionStorage.getItem("id") || cookie.load('id')) {
                    return <Redirect to="/" />
                  } else {
                    return <Signin setIsLogin={setIsLogin} setEmail={setEmail} setName={setName} setUserId={setUserId} userId={userId} />
                  }
                }} />
                <Route exact path="/signup" render={() => {
                  return <Signup />
                }} />
                <Route exact path="/home" render={() => {
                  if (window.sessionStorage.getItem("id")|| cookie.load('id')) {
                    return <Home />
                  } else {
                    return <Redirect to="/" />
                  }
                }} />
                <Route exact path="/schedule" render={() => {
                  if (window.sessionStorage.getItem("id")|| cookie.load('id')) {
                    return <Schedule userId={userId} />
                  } else {
                    return <Redirect to="/" />
                  }
                }} />
                <Route exact path="/search" render={() => {
                  if (window.sessionStorage.getItem("id")|| cookie.load('id')) {
                    return <Search userId={userId} />
                  } else {
                    return <Redirect to="/" />
                  }
                }} />
                <Route exact path="/mypage" render={() => {
                  if (window.sessionStorage.getItem("id")|| cookie.load('id')) {
                    return <MyPage setIsLogin={setIsLogin} email={email} setEmail={setEmail} name={name} setName={setName} />
                  } else {
                    return <Redirect to="/" />
                  }
                }} />
                <Route path="/" render={() => {
                  if (window.sessionStorage.getItem("id")|| cookie.load('id')) {
                    return <Redirect to="/home" />
                  } else {
                    return <Redirect to="/intro" />
                  }
                }} />

              </Switch>
            </div>
            {/* </svg> */}
    </div>
  );
}

export default withRouter(App);