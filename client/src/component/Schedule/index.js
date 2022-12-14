import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Schedule.scss";
import AddIcon from "@material-ui/icons/Add";
import { Container, Button, Link } from "react-floating-action-button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Modal from "../Modal";
import { useContext } from "react";
import { UserContext } from "../../App";
import { ScheduleData } from "../../fakeDB";
import kakaobank from "../../kakaobank.png";
import toss from "../../toss.png";
import Search from "../Search";
import ModifyModal from "../Modal/ModifyModal";
import Item from "./Item";

export default function Schedule() {
  const [user] = useContext(UserContext);

  const [data, setData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  //schedule 리스트를 띄움? 안띄움
  const [isSchedule, setSchedule] = useState(true);

  useEffect(() => {
    //데이터 받아오기
    const data = ScheduleData[user.id];
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setData(data);
  }, []);

  const scheduleEl =
    data &&
    data.map((curData) => (
      <Item
        data={curData}
        userId={user.id}
        schedules={data}
        setData={setData}
      />
    ));

  return (
    <div className="schedule">
      <div className="gradient"></div>
      <h1>
        경조사 기록
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpenModal(!isOpenModal);
          }}
          className="addBtn"
        >
          <AddIcon />
        </button>
      </h1>
      <span className="transferIcon">
        <span className="kakaobank">
          <Link to="kakaobank://" replace={true}>
            <img src={kakaobank}></img>
          </Link>
        </span>
        <span className="toss">
          <Link to="supertoss://" replace={true}>
            <img src={toss}></img>
          </Link>
        </span>
      </span>
      <div className="search">
        <Search
          userId={user.id}
          setSchedule={setSchedule}
          isSchedule={isSchedule}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpenModal(!isOpenModal);
        }}
        className="addBtnTwo"
      >
        + 경조사 추가하기
      </button>
      <ul className={isSchedule ? "schedule_list" : "none"}>{scheduleEl}</ul>
      {isOpenModal && <Modal userId={user.id} setIsOpenModal={setIsOpenModal} />}
      <Container className="transferIcon">
        <Link href="kakaobank://" tooltip="카카오뱅크" className="kakao" />
        <Link href="supertoss://" tooltip="토스" className="toss" />
        <AttachMoneyIcon className="won" />
      </Container>
    </div>
  );
}
