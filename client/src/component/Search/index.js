import React, { useEffect, useState } from "react";
import "./Search.scss";
import { ScheduleData } from "../../fakeDB";
import Item from "../Schedule/Item";

export default function Search({
  data,
  userId,
  setSchedule,
  isSchedule,
  setData,
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [tags] = useState([
    "생일",
    "결혼식",
    "장례식",
    "집들이",
    "취직",
    "입학",
    "출산",
    "돌잔치",
    "기념일",
    "기타",
  ]);

  useEffect(() => {
    const data = ScheduleData[userId].filter(
      (target) =>
        target.event_target.includes(searchKeyword) ||
        target.type.includes(searchKeyword)
    );
    setSearchData(data);
  }, [searchKeyword]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
    if (e.target.value === "") {
      setSearchData([]);
      setSchedule(true);
    } else {
      setSchedule(false);
    }
  };

  const tagFiltering = (e) => {
    e.preventDefault();
    setSchedule(false);
    setSearchKeyword(e.target.value);
  };

  const searchEle =
    searchData &&
    searchData.map((curData) => (
      <Item data={curData} userId={userId} schedules={data} setData={setData} />
    ));

  const tagEle =
    tags &&
    tags.map((tag) => (
      <button
        className={tag}
        onClick={(e) => tagFiltering(e)}
        value={tag}
      >{`#${tag}`}</button>
    ));

  return (
    <div className="search">
      <div className="gradient"></div>
      <div className="full_page">
        <input
          type="text"
          className="search_input"
          placeholder="이벤트 대상의 이름 혹은 이벤트 종류를 입력해주세요."
          onChange={(e) => onChangeHandler(e)}
          value={searchKeyword}
        ></input>
        <ul className="tag">{tagEle}</ul>
        <ul className={isSchedule ? "none" : "search_list"}>{searchEle}</ul>
      </div>
    </div>
  );
}
