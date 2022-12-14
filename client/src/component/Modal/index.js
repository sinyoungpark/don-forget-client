import React from "react";
import { useState } from "react";
import { ScheduleData } from "../../fakeDB";
import "./Modal.scss";

export default function Modal({ setIsOpenModal, userId }) {
  const [giveandtake, setGiveAndTake] = useState("");
  const [date, setDate] = useState("");
  const [target, setTarget] = useState("");
  const [type, setType] = useState("");
  const [giftType, setGiftType] = useState("");
  const [gift, setGift] = useState("");
  const [inputType, setInputType] = useState("");

  const addScheduleHandler = (e) => {
    e.preventDefault();
    if (target && type && gift && giveandtake && giftType && date) {
      ScheduleData[userId].push({
        date: date,
        event_target: target,
        type: type,
        gift: [giftType, gift],
        giveandtake: giveandtake,
      });

      setIsOpenModal(false);
    } else {
      alert("입력해주세요");
    }
  };

  return (
    <div className="modal">
      <div className="content">
        <h3>경조사 추가하기</h3>
        <form>
          <div className="buttonGroup">
            <button
              id="giveBtn"
              value="give"
              className={giveandtake === "give" ? "selected" : "no"}
              onClick={(e) => {
                e.preventDefault();
                setGiveAndTake(e.target.value);
              }}
            >
              give
            </button>
            <button
              id="take"
              value="take"
              className={giveandtake === "take" ? "selected" : "no"}
              onClick={(e) => {
                e.preventDefault();
                setGiveAndTake(e.target.value);
              }}
            >
              take
            </button>
          </div>

          <input
            type="date"
            id="birthday"
            name="birthday"
            onChange={(e) => setDate(e.target.value)}
            data-label="경조사 날짜 *"
          />

          <input
            type="text"
            placeholder="경조사 대상(사람 이름) *"
            data-label="event target"
            onChange={(e) => setTarget(e.target.value)}
          />

          <select
            className="event_type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled selected>
              {" "}
              경조사 종류
            </option>
            <option value="생일">생일</option>
            <option value="결혼식">결혼식</option>
            <option value="장례식">장례식</option>
            <option value="집들이">집들이</option>
            <option value="취직">취직</option>
            <option value="입학">입학</option>
            <option value="출산">출산</option>
            <option value="돌잔치">돌잔치</option>
            <option value="기념일">기념일</option>
            <option value="기타">기타</option>
          </select>

          <div className="giftInput">
            <select
              name="gift_type"
              className="gift_type"
              value={giftType}
              onChange={(e) => {
                // console.log('value : ',e.target.value)
                if (e.target.value === "선물") {
                  setInputType("text");
                } else if (e.target.value === "현금") {
                  setInputType("number");
                }
                setGiftType(e.target.value);
              }}
            >
              <option value="" disabled selected>
                선물 / 현금
              </option>
              <option value="선물">선물</option>
              <option value="현금">현금</option>
            </select>
            <input
              className="gift_money add_event"
              type={inputType}
              placeholder="주거나 받은 내역 *"
              name="input_give_and_take"
              data-label="주거나 받은 내역(선물/현금)"
              onChange={(e) => setGift(e.target.value)}
            />
          </div>

        <div className="bottom-btn">
        <button
            className="cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsOpenModal(false);
            }}
          >
            취소
          </button>
          <button className="submit-btn" onClick={(e) => addScheduleHandler(e)}>
            저장하기
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
