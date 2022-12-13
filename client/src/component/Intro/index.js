import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "../../Logo.png";
import "./Intro.scss";

export default function Intro() {
  return (
    <div className="intro">
      {window.sessionStorage.getItem("id") && (
        <Navigate to="/home" replace={true} />
      )}
      <div className="full_page">
        <div className="title_content">
          <img className="logo" src={Logo} alt="Logo_don-forget" />
          <div className="title">돈't forget</div>
          <div className="desc">
            고마운 사람에 대한 기억을 잊고 있진 않으신가요? 당신의 경조사를 쉽고
            간편하게 기록해 보세요!
          </div>
        </div>
      </div>
    </div>
  );
}
