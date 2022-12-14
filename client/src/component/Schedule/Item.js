import React from "react";
import { useState } from "react";
import { ScheduleData } from "../../fakeDB";
import ModifyModal from "../Modal/ModifyModal";

export default function Item({ data, schedules, setData }) {
  const { id, type, event_target, gift, giveandtake } = data;
  const date = String(data.date).slice(0, 10);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleDeleteBtn = (e) => {
    e.preventDefault();
    const filtering = schedules.filter((item) => item.id !== id);
    setData(filtering);
  };

  return (
    <div className="date_li">
      <div className="date">
        {date.slice(5, 7)} / {date.slice(8)}
      </div>
      <li key={id}>
        <button className="li_button" onClick={(e) => setIsOpenModal(true)}>
          수정
        </button>
        <button className="li_button" onClick={(e) => handleDeleteBtn(e)}>
          삭제
        </button>
        <span className={type}>{giveandtake === "give" ? "→" : "←"}</span>
        <span className="type">
          {event_target} {type}
        </span>
        <span className="gift">
          {gift[0] === "현금"
            ? gift[0] +
              " " +
              new Intl.NumberFormat().format(Number(gift[1])) +
              "원"
            : gift[0] + " " + gift[1]}{" "}
        </span>
        {isOpenModal && (
          <ModifyModal data={data} setIsOpenModal={setIsOpenModal} />
        )}
      </li>
    </div>
  );
}
