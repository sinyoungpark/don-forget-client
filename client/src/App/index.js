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
  const [user, setUser] = useState(window.sessionStorage.getItem("id"));

  return (
    <div className="app">
      <div
        className={
          location.pathname === "/intro"
            ? "background"
            : location.pathname === "/signin" || location.pathname === "/signup"
            ? "fullBackground"
            : "sideBackground"
        }
      >
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}
