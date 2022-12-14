import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { User } from "../../fakeDB";
import Logo from "../../Logo.png";
import "./Signin.scss";
import GoogleSignUp from "./Google";
import FacebookSignUp from "./Facebook";
import { useContext } from "react";
import { UserContext } from "../../App";
import Modal from "./Modal";

export default function Signin() {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  //비밀번호 재설정 modal 창
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleLoginBtn = (e) => {
    e.preventDefault();
    const user = User.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      window.sessionStorage.setItem("id", user.id);
      window.sessionStorage.setItem("email", user.email);
      window.sessionStorage.setItem("name", user.name);
    } else {
      setError(true);
    }
  };


  return (
    <div className="signin">
      {user.id && <Navigate to="/" replace={true} />}
      <Link to="/" replace={true}><img src={Logo} alt="Logo_dont-forget" className="logo" /></Link>
      <h1>로그인</h1>
      <form className="login_form">
        <input
          type="text"
          placeholder="이메일 주소 *"
          label="이메일 주소"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 *"
          label="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={error ? "alert" : "none"}>
          <strong> ⚠️ &nbsp; Error</strong>
          아이디와 비밀번호가 일치하지 않습니다.
        </div>
        <button className="login_btn" onClick={(e) => handleLoginBtn(e)}>
          로그인
        </button>
        <div className="bottom">
          <span
            onClick={(e) => {
              e.preventDefault();
              setIsOpenModal(true);
            }}
          >
            비밀번호 찾기
          </span>
          <Link to="/signup" replace={true}>
            회원가입
          </Link>
        </div>
      </form>
      {/* <span className="socialLogin">
        <GoogleSignUp
          setIsLogin={setIsLogin}
          setEmail={setEmail}
          setName={setName}
          setUserId={setUserId}
        />
        <FacebookSignUp
          setIsLogin={setIsLogin}
          setEmail={setEmail}
          setName={setName}
          setUserId={setUserId}
        />
      </span> */}
      {isOpenModal && (
        <Modal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
      )}
    </div>
  );
}
