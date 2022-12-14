import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../img/Logo.png";
import "./Intro.scss";
import { UserContext } from "../../App";

export default function Intro() {
  const [user] = useContext(UserContext);
  return (
    <div className="intro">
      {user.id && (
        <Navigate to="/home" replace={true} />
      )}
      <div className="left">
        <div className="title">돈't forget</div>
        <div className="desc">
          고마운 사람에 대한 기억을 잊고 있진 않으신가요? 당신의 경조사를 쉽고
          간편하게 기록해 보세요!
        </div>
      </div>
      <div className="right">
        <span></span>
        <img className="logo" src={Logo} alt="Logo_don-forget" />
      </div>
    </div>
  );
}
