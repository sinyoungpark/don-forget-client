import React, { useState } from "react";
import "./Signup.scss";
import Logo from "../img/Logo.png";
import { User } from "../../fakeDB";
import { Navigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  //회원가입 실패 alert 창 !
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPW, setWrongPW] = useState(false);
  const [wrongName, setWrongName] = useState(false);
  const [wrongQuestion, setWrongQuestion] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const [success, setSuccess] = useState(false);

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const signUpBtnHandler = (e) => {
    e.preventDefault();
    if (
      validate(email) &&
      password === passwordCheck &&
      name !== "" &&
      question !== "" &&
      answer !== ""
    ) {
      User.push({
        email: email,
        name: name,
        password: password,
        type: question,
        password_answer: answer,
      });
      alert("회원가입을 축하드립니다.")
      setSuccess(true);
    } else {
      validate(email) ? setWrongEmail(false) : setWrongEmail(true);
      password === passwordCheck && password !== ""
        ? setWrongPW(false)
        : setWrongPW(true);
      name !== "" ? setWrongName(false) : setWrongName(true);
      question !== "" ? setWrongQuestion(false) : setWrongQuestion(true);
      answer !== "" ? setWrongAnswer(false) : setWrongAnswer(true);
    }
  };

  return (
    <div className="signup">
      {success && <Navigate to="/signin" replace={true} />}
      <Link to="/" replace={true}><img src={Logo} alt="Logo_dont-forget" className="logo" /></Link>
        <h1>회원가입</h1>
        <form className="signup_form">
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소 *"
            label="이메일 주소"
          />
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 *"
            label="이름 *"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호 *"
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인 *"
            label="비밀번호 확인"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <select
            className="question"
            onChange={(e) => setQuestion(e.target.value)}
          >
            <option value="" disabled selected>
              비밀번호 찾기 힌트 질문: *
            </option>
            <option value="1">가장 기억에 남는 선생님 성함은?</option>
            <option value="2">내가 존경하는 인물은?</option>
            <option value="3">나의 노래방 애창곡은?</option>
          </select>
          <input
            type="text"
            name="answer"
            placeholder="비밀번호 찾기 힌트 답 *"
            label="비밀번호 찾기 힌트 답"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className={wrongEmail ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            유효하지 않은 이메일입니다.
          </div>
          <div className={wrongPW ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            비밀번호가 일치하지 않습니다.
          </div>
          <div className={wrongName ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            이름을 입력해주세요.
          </div>
          <div className={wrongQuestion ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            비밀번호 찾기 힌트 질문을 선택해주세요.
          </div>
          <div className={wrongAnswer ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            비밀번호 찾기 힌트 답을 입력해주세요.
          </div>
          <button onClick={signUpBtnHandler}>회원가입</button>
        </form>
    </div>
  );
}
