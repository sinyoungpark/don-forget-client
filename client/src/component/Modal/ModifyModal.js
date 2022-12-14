import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { ScheduleData } from "../../fakeDB";
import "./Modal.scss";

export default function ModifyModal({ setIsOpenModal, data }) {
  const [user] = useContext(UserContext);

  /* post 요청 시 onchange 값들 */
  const [date, setDate] = useState(data.date);
  const [event_target, setEventTarget] = useState(data.event_target);
  const [type, setType] = useState(data.type);
  const [giftType, setGiftType] = useState(data.gift[0]);
  const [giftValue, setGiftValue] = useState(data.gift[1]);
  const [giveandtake, setGiveAndTake] = useState(data.giveandtake);

  const handleModifyBtn = (e) => {
    e.preventDefault();
    const resData = ScheduleData[user.id].find(
      (schedule) => schedule.id === data.id
    );
    resData.date = date;
    resData.event_target = event_target;
    resData.type = type;
    resData.giveandtake = giveandtake;
    resData.gift = [giftType, giftValue];
    console.log(resData);

    setIsOpenModal(false);
  };

  return (
    <div className="modal">
      <div className="content">
        <h3>경조사 수정하기</h3>
        <form>
          <div className="buttonGroup">
            <button
              id="give"
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
            defaultValue={date}
            name="birthday"
            onChange={(e) => setDate(e.target.value)}
            data-label="경조사 날짜 *"
          />
          <input
            defaultValue={event_target}
            type="text"
            placeholder="경조사 대상(사람 이름) *"
            data-label="event target"
            onChange={(e) => setEventTarget(e.target.value)}
          />

          <select
            className="event_type"
            onChange={(e) => setType(e.target.value)}
            defaultValue={type}
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
              defaultValue={giftType}
              onChange={(e) => {
                setGiftType(e.target.value);
              }}
            >
              <option value="선물">선물</option>
              <option value="현금">현금</option>
            </select>
            <input
              className="gift_money"
              type={type}
              defaultValue={giftValue}
              placeholder="주거나 받은 내역 *"
              name="input_give_and_take"
              data-label="주거나 받은 내역(선물/현금)"
              onChange={(e) => setGiftValue(e.target.value)}
            />
          </div>

          <div className="bottom-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpenModal();
              }}
            >
              취소
            </button>
            <button onClick={(e) => handleModifyBtn(e)}>수정하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
