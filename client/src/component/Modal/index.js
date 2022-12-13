import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import "./Modal.scss"

export default function Modal(props) {
    /* post 요청 시 onchange 값들 */
    const [date, setDate] = useState("");
    const [eventTarget, setTarget] = useState("");
    const [eventType, setType] = useState("");
    const [gift, setGift] = useState("");

    /* get요청으로 받아온 값들 -> 수정 시 필요 */
    const { isOpen, setModal, isModify, data_date, data_giftType, data_event_target, data_event_type, data_gift, schedule_id, event_id, handleModify, setUseEffect, controllUseEffect, data_giveandtake, setAgain, scheduleDate } = props;

    const [giveAndTake, setGiveAndTake] = useState("");
    const [giftType, setGiftType] = useState("");
    const [inputType, setInputType] = useState("");


    function handleSaveBtn(e) {

        e.preventDefault();

        console.log(date, eventTarget, eventType, gift, giveAndTake, giftType, scheduleDate);

        if (scheduleDate) {
            if (eventTarget && eventType && gift && giveAndTake && giftType && scheduleDate) {
                console.log(giveAndTake);
                axios.post(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
                    date: scheduleDate,
                    event_target: eventTarget,
                    type: eventType,
                    gift: [giftType, gift],
                    giveandtake: giveAndTake
                })
                    .then((res) => console.log(res.data))
                    .then(() => {
                        setModal(!isOpen);
                        setDate("");
                        setTarget("");
                        setGift("");
                        setGiveAndTake("");
                        if (setUseEffect) {
                            setUseEffect(!controllUseEffect);
                        }
                    })
            }
            else {
                alert("입력해주세요")
            }
        }
        else {
            if (eventTarget && eventType && gift && giveAndTake && giftType && date) {
                console.log(giveAndTake);
                axios.post(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
                    date: date,
                    event_target: eventTarget,
                    type: eventType,
                    gift: [giftType, gift],
                    giveandtake: giveAndTake
                })
                    .then((res) => console.log(res.data))
                    .then(() => {
                        setModal(!isOpen);
                        setDate("");
                        setTarget("");
                        setGift("");
                        setGiveAndTake("");
                        if (setUseEffect) {
                            setUseEffect(!controllUseEffect);
                        }
                    })
            }
            else {
                alert("입력해주세요")
            }
        }
    }

    function handleModifyBtn(e) {
        e.preventDefault();

        axios.put(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`, {
            date: date ? date : data_date,
            event_target: eventTarget ? eventTarget : data_event_target,
            type: eventType ? eventType : data_event_type,
            gift: gift ? [giftType, gift] : [data_giftType, data_gift],
            giveandtake: giveAndTake ? giveAndTake : data_giveandtake
        }, {
            params: {
                schedule_id: e.target.name
            }
        })
            .then((res) => console.log(res.data))
            .then(() => {
                handleModify(!isModify);
                if (setUseEffect) {
                    setUseEffect(!controllUseEffect);
                }
                else if (setAgain) {
                    setAgain(true);
                }
            });
    }

    return (
        <div className={isOpen ? "addModal" : (isModify ? "modifyModal" : "none")}>
            <div className="content">
                <h3 className="add_event">경조사 추가하기</h3>
                <h3 className="modify_event">경조사 수정하기</h3>

                <form>
                    <div className="buttonGroup add_event">
                        <button id="giveBtn" value="give" className={giveAndTake === "give" ? "selected" : "no"} onClick={(e) => {
                            e.preventDefault();
                            setGiveAndTake(e.target.value);
                        }}>give</button>
                        <button id="take" value="take" className={giveAndTake === "take" ? "selected" : "no"} onClick={(e) => {
                            e.preventDefault();
                            setGiveAndTake(e.target.value);
                        }}>take</button>
                    </div>

                    <div className="buttonGroup modify_event">
                        <button id="give" value="give" className={giveAndTake === "give" ? "selected" : "no"} onClick={(e) => {
                            e.preventDefault();
                            setGiveAndTake(e.target.value);
                        }}>give</button>
                        <button id="take" value="take" className={giveAndTake === "take" ? "selected" : "no"} onClick={(e) => {
                            e.preventDefault();
                            setGiveAndTake(e.target.value);
                        }}>take</button>
                    </div>
                    {
                        !scheduleDate ? <input className="add_event" type="date" id="birthday" name="birthday" onChange={(e) => setDate(e.target.value)} data-label="경조사 날짜 *" /> : console.log(false)
                    }
                    {
                        !scheduleDate ? <input className="modify_event" type="date" id="birthday" defaultValue={data_date} name="birthday" onChange={(e) => setDate(e.target.value)} data-label="경조사 날짜 *" /> : console.log(false)
                    }
                    <input className="add_event" type="text" placeholder="경조사 대상(사람 이름) *" data-label="event target" onChange={(e) => setTarget(e.target.value)} />

                    <input className="modify_event" defaultValue={data_event_target} type="text" placeholder="경조사 대상(사람 이름) *" data-label="event target" onChange={(e) => setTarget(e.target.value)} />

                    <select className="event_type add_event" onChange={(e) => setType(e.target.value)}>
                        <option value="" disabled selected> 경조사 종류</option>
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

                    <select className="event_type modify_event" onChange={(e) => setType(e.target.value)} defaultValue={data_event_type}>
                        <option value="" disabled selected> 경조사 종류</option>
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
                        <select name="gift_type" className="gift_type add_event" value={giftType} onChange={e => {
                            // console.log('value : ',e.target.value)
                            if (e.target.value === '선물') {
                                setInputType('text');
                            } else if (e.target.value === '현금') {
                                setInputType('number');
                            }
                            setGiftType(e.target.value)
                            //option 변경시 input값 초기화
                            document.getElementsByTagName('input')[3].value = "";
                        }}>
                            <option value='' disabled selected>선물 / 현금</option>
                            <option value='선물'>선물</option>
                            <option value='현금'>현금</option>
                        </select>
                        <input className="gift_money add_event" type={inputType} placeholder="주거나 받은 내역 *" name="input_give_and_take" data-label="주거나 받은 내역(선물/현금)" onChange={(e) => setGift(e.target.value)} />
                    </div>


                    <button className="add_event" onClick={(e) => {
                        e.preventDefault();
                        setModal(false)
                    }}>취소</button>
                    <button className="add_event" onClick={handleSaveBtn}>저장하기</button>


                    <div className="giftInput">
                        <select name="gift_type" className="gift_type modify_event" value={giftType} onChange={e => {
                            // console.log('value : ',e.target.value)
                            if (e.target.value === '선물') {
                                setInputType('text');
                            } else if (e.target.value === '현금') {
                                setInputType('number');
                            }
                            setGiftType(e.target.value)
                            //option 변경시 input값 초기화
                            document.getElementsByTagName('input')[4].value = "";
                        }}>
                            <option value=''>선물 / 현금</option>
                            <option value='선물'>선물</option>
                            <option value='현금'>현금</option>
                        </select>
                        <input className="gift_money modify_event" type={inputType} defaultValue={data_gift} placeholder="주거나 받은 내역 *" name="input_give_and_take" data-label="주거나 받은 내역(선물/현금)" onChange={(e) => setGift(e.target.value)} />
                    </div>


                    <button className="modify_event" onClick={(e) => {
                        e.preventDefault();
                        handleModify(!isModify);
                    }}>취소</button>
                    <button className="modify_event" onClick={handleModifyBtn} name={schedule_id} value={event_id}>수정하기</button>
                </form>
            </div>
        </div>
    )
}



