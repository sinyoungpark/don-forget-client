import React from "react";
import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App/";
import Intro from "./component/Intro";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Schedule from "./component/Schedule";

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Intro/>
      },
      {
        path : "/signin",
        element : <Signin/>
      },
      {
        path : "signup",
        element : <Signup/>
      },
      {
        path : "/home",
        element : <Home/>
      },
      {
        path : "schedule",
        element : <Schedule/>
      }
    ]
  }
])

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)