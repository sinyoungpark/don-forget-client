import React, { useContext, useState } from "react";
import { User } from "../../fakeDB";

export default function PasswordModal({ setOpenPassword, userId }) {
  const [oldPassword, setOldPassword] = useState("");
  const [isRightPassword, setIsRightPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const target = User.find((data) => data.id === userId);
    if (oldPassword === target.password) {
      setIsRightPassword(true);
    }
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();
    if (newPassword === newPasswordCheck) {
      setOpenPassword(false);
    } else alert("비밀번호가 다릅니다");
  };

  return (
    <div className="changePasswordModal">
      <div className="changePW_content">
        <h3>비밀번호 변경하기</h3>

        <h4>Step 1.</h4>
        <input
          type="password"
          placeholder="기존 비밀번호"
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
        <button onClick={() => setOpenPassword(false)}>취소</button>
        <button onClick={checkPasswordHandler}>확인</button>
        <div className={isRightPassword ? "newPw" : "none"}>
          <h4>Step 2.</h4>
          <input
            type="password"
            placeholder="새 비밀번호"
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            onChange={(e) => setNewPasswordCheck(e.target.value)}
          ></input>
          <button onClick={() => setOpenPassword(false)}>취소</button>
          <button onClick={changePasswordHandler}>변경</button>
        </div>
      </div>
    </div>
  );
}
