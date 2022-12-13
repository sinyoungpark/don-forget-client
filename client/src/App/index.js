import React from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Nav from "../component/Nav";
import "./App.scss";

export const UserContext = createContext([]);

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState({
    id : window.sessionStorage.getItem("id"),
    email :  window.sessionStorage.getItem("email"),
    name : window.sessionStorage.getItem("name")
  });

  return (
    <div className="app">
      <UserContext.Provider value={[user, setUser]}>
        <Nav />
        <div
          className={
            location.pathname === "/intro"
              ? "background"
              : location.pathname === "/signin" ||
                location.pathname === "/signup"
              ? "fullBackground"
              : "sideBackground"
          }
        >
          <Outlet />
        </div>
      </UserContext.Provider>
    </div>
  );
}
