import React from "react";
import { useState } from "react";
import { User } from "../../fakeDB";

export default function Modal({ isOpenModal, setIsOpenModal }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [content, setContent] = useState([
    {
      title: "비밀번호 찾기 Step One",
      desc: "비밀번호를 찾고자 하는 아이디와 이름을 입력해 주세요.",
    },
    {
      title: "비밀번호 찾기 Step Two",
      desc: "가장 최근 읽었던 책 제목은?",
    },
    {
      title: "새 비밀번호 설정",
      desc: "새 비밀번호를 입력해주세요.",
    },
  ]);
  const [curIdx, setCurIdx] = useState(0);

  const count = (e) => {
    e.preventDefault();
    if (curIdx === 0) {
      const user = User.find(
        (user) => user.name === name && user.email === email
      );
      if (user) {
        setUser(user);
        setCurIdx(curIdx + 1);
      }
    } else if (curIdx === 1) {
      if (user.answer === answer) setCurIdx(curIdx + 1);
    } else if (curIdx === 2) {
      if (newPassword === passwordCheck) {
        User.find((ele) => {
          if (ele.id === user.id) {
            ele.password = newPassword;
            setIsOpenModal(false);
            return true;
          }
        });
      }
    }
  };

  return (
    <div className="find_password_form">
      <form action="" className="modal">
        <div className="content">
          <h3>{content[curIdx].title}</h3>
          <p> {content[curIdx].desc}</p>
          {curIdx === 0 && (
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
          )}
          {curIdx === 1 && (
            <div className="findPW">
              <input
                type="text"
                placeholder="질문에 알맞는 응답을 입력해주세요"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          )}
          {curIdx === 2 && (
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
          )}
          <div className="findPwBtn">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpenModal(!isOpenModal);
              }}
            >
              취소
            </button>
            {curIdx < 2 && (
              <button className="nextBtn" onClick={(e) => count(e)}>
                다음
              </button>
            )}
            {curIdx >= 2 && <button onClick={(e) => count(e)}>확인</button>}
          </div>
        </div>
      </form>
    </div>
  );
}
