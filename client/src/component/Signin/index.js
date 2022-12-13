import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { User } from "../../fakeDB";
import Logo from "../../Logo.png";
import "./Signin.scss";
import GoogleSignUp from './Google';
import FacebookSignUp from './Facebook';

export default function Signin() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  //비밀번호 재설정 modal 창
  const [isOpenStepOne, setStepOne] = useState(false);
  const [isOpenStepTwo, setStepTwo] = useState(false);
  const [isOpenNewPW, setIsOpenNewPW] = useState(false);
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleLoginBtn = async(e) => {
    e.preventDefault();
    const user = User.find(
      (user) => user.email === email && user.password === password
    );
    console.log(user);
    if (user) {
      window.sessionStorage.setItem("id", user.id);
      window.sessionStorage.setItem("email", user.email);
      window.sessionStorage.setItem("name", user.name);
      setIsLogin(true);
    } else {
      setError(true);
    }
  };

  const handleFindPw = (e) => {
    e.preventDefault();
    const user = User.find(
      (user) => user.name === name && user.email === email
    );
    if (user) {
      setUser(user);
      setStepTwo(true);
    }
  };

  const openPwSettingModal = (e) => {
    e.preventDefault();
    if (user.answer === answer) setIsOpenNewPW(true);
  };

  const setNewPasswordHandler = () => {
    if (newPassword === passwordCheck) {
      User.find((ele) => {
        if (ele.id === user.id) {
          ele.password = newPassword;
          setStepOne(!isOpenStepOne);
          setStepTwo(!isOpenStepTwo);
          setIsOpenNewPW(!isOpenNewPW);
          return true;
        }
      });
    }
  };

  return (
    <div className="signin">
      {isLogin && <Navigate to="/" replace={true} />}
      <img src={Logo} alt="Logo_dont-forget" className="logo" />
      <h1>로그인</h1>
      <form className="inputValue">
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
        <button className="login_btn" onClick={(e) => handleLoginBtn(e)}>
          로그인
        </button>
        <span
          onClick={(e) => {
            e.preventDefault();
            setStepOne(!isOpenStepOne);
          }}
        >
          비밀번호 찾기
        </span>
        <Link to="/signup" replace={true}>
          회원가입
        </Link>
        <div className={error ? "alert" : "none"}>
          <strong> ⚠️ &nbsp; Error</strong>
          아이디와 비밀번호가 일치하지 않습니다.
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
      <form className={isOpenStepOne ? "modal" : "none"}>
        <div className="content">
          <h3>비밀번호 찾기 Step One</h3>
          <p> 비밀번호를 찾고자 하는 아이디와 이름을 입력해 주세요.</p>
          <div className="findPW">
            <input
              type="text"
              placeholder="don-forget 이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="don-forget 이름"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="findPwBtn">
            <button>취소</button>
            <button className="nextBtn" onClick={handleFindPw}>
              다음
            </button>
          </div>
        </div>
      </form>
      <form className={isOpenStepTwo ? "modal" : "none"}>
        <div className="content">
          <h3>비밀번호 찾기 Step two</h3>
          <p>가장 최근 읽었던 책 제목은?</p>
          <div className="findPW">
            <input
              type="text"
              placeholder="질문에 알맞는 응답을 입력해주세요"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="findPwBtn">
            <button>취소</button>
            <button className="nextBtn" onClick={openPwSettingModal}>
              다음
            </button>
          </div>
        </div>
      </form>
      <form className={isOpenNewPW ? "modal" : "none"}>
        <div className="content">
          <h3>새 비밀번호 설정</h3>
          <p>새 비밀번호를 입력해주세요.</p>
          <div className="findPW">
            <input
              type="text"
              placeholder="새 비밀번호 *"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="비밀번호 확인 *"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <div className="findPwBtn">
            <button onClick={(e) => setNewPasswordHandler(e)}>확인</button>
          </div>
        </div>
      </form>
    </div>
  );
}
