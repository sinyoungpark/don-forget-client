import React, { useState } from "react";
import "./MyPage.scss";
import axios from "axios";
import Chart from "./Mypage_Chart";
import CsvDownloader from "react-csv-downloader";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Navigate } from "react-router-dom";
import PasswordModal from "./PasswordModal";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 20,
    borderRadius: 50,
    "@media(min-width: 1px) and (max-width:  757px)": {
      fontSize: 18,
    },
  },
}));

export default function MyPage() {
  const classes = useStyles();

  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

  const [openName, setOpenName] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [openPassword, setOpenPassword] = useState(false);

  const signoutHandler = (e) => {
    e.preventDefault();
    window.sessionStorage.clear();
    setUser({});
  };

  const changeNameHandler = (e) => {
    e.preventDefault();
    setOpenName(false);
    setName(changeName);
    window.sessionStorage.getItem("name", changeName);
  };

  const columns = [
    {
      id: "날짜",
      displayName: "날짜",
    },
    {
      id: "경조사 종류",
      displayName: "경조사 종류",
    },
    {
      id: "경조사 대상",
      displayName: "경조사 대상",
    },
    {
      id: "선물 또는 현금",
      displayName: "선물 또는 현금",
    },
    {
      id: "give 또는 take",
      displayName: "give 또는 take",
    },
  ];

  const list = [];

  return (
    <div className="mypage">
      {!user.id && <Navigate to="/" replace={true} />}
      <div className="full_page">
        <h1>경조사 지출 통계</h1>
        <div className="chart">
          <Chart />
        </div>
        <CsvDownloader
          filename="경조사_donforget"
          separator=";"
          wrapColumnChar="'"
          columns={columns}
          datas={list}
          className="backCsvMobile"
        >
          <button className="csv"> 경조사 기록 엑셀로 내보내기(.csv)</button>
          <DescriptionIcon className={classes.icon} />
        </CsvDownloader>
        <div className="userInfo">
          <h1>사용자 정보</h1>
          <div>
            이름 :{" "}
            {openName ? (
              <>
                <input
                  type="text"
                  placeholder="변경할 이름을 입력해주세요."
                  onChange={(e) => setChangeName(e.target.value)}
                ></input>
                <button
                  className="clickChangeNameBtn"
                  onClick={changeNameHandler}
                >
                  ✔︎
                </button>
              </>
            ) : (
              name
            )}
          </div>
          <div>
            이메일 :{" "}
            {email.split("-")[1] !== undefined ? email.split("-")[1] : email}
          </div>
          <div className="mypage_buttons">
            <button
              className="changeBtn"
              onClick={() => setOpenName(!openName)}
            >
              이름 변경
            </button>
            <button
              className="changeBtn"
              onClick={() => setOpenPassword(!openPassword)}
            >
              비밀번호 변경
            </button>
            <button className="changeBtn" onClick={(e) => signoutHandler(e)}>
              로그아웃
            </button>
          </div>
        </div>
        {openPassword && (
          <PasswordModal setOpenPassword={setOpenPassword} userId={user.id} />
        )}
      </div>
    </div>
  );
}
