import React, {useState, useRef, useEffect} from "react";
import './Home.scss';
import { makeStyles } from "@material-ui/core/styles";
import moment, { Moment as MomentTypes } from 'moment';
import axios from "axios";
import ChevronLeftSharpIcon from '@material-ui/icons/ChevronLeftSharp';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';

import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import kakaobank from '../../kakaobank.png';
import toss from '../../toss.png';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "36px",
    height: "36px",
    backgroundColor: "white",
  }
}))

export default function Home(){
  const classes = useStyles();

  // 달력 랜더
  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate._locale._months[selectedDate.month()])
  // 월 선택 모달
  const ref = useRef(null);
  const [openSelectMonth, setOpenSelectMonth] = useState(false)
  const [year, setYear] = useState(moment().year())
  // 오른쪽 일정 창 오픈
  const [openSchedule, setOpenSchedule] = useState(false)
  // 일정 추가 모달
  const [isOpen, setModal] = useState(false);
  // 일정 받아오기
  const [data, setData] = useState(null);
  // 다음달 지출 및 예상 이벤트 가져오기.
  const [nextMonth, setNextMonth] = useState([]);

  //수정이 생길 때마다 setUseEffect 
  const [isUseEffect, setUseEffect] = useState(true);

  // 다음달 알림 메시지
  const [open, setOpen] = useState(true);

  //add_schedule에서 달력 선택 없이 바로 날짜 제공
  const [scheduleDate, setScheduleDate] = useState("");

  useEffect(() => {
    // 선택한 날짜에 맞게 월 업데이트
    setMonth(selectedDate._locale._months[selectedDate.month()])
  }, []);

  //스케쥴에 변화가 있을 때마다 get요청 ㄱㄱ
  useEffect(() => {
    if (isUseEffect) {
      getSchedule();
      nextMonthInfo();
      setUseEffect(false);
    }
  },[isUseEffect]);

  const selectMonth = () => {
    setOpenSelectMonth(!openSelectMonth);
  }


  const getSchedule = () => {
    axios.get(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`)
      .then((res) => {
        let data = res.data;
        data = data.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setData(data);
        console.log(data);
      })
  }

    //다음달 정보 가져오는 기능 구현
    const nextMonthInfo = () => {
      axios.get(`https://don-forget-server.com/schedule/expectNextCost/${window.sessionStorage.getItem("id")}`)
        .then((res) => {
          console.log('res.data : ', res.data);
          setNextMonth(res.data);
        })
        .catch(err => console.error(err));
    }


  const makeWeek = () => {
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const week_Calendar = week.map((day) => {
      return (
        <div className="box">
          <span className="text">{day}</span>
        </div>
      )
    })
    return week_Calendar;
  }

  const monthModal = () => {
    const Calendar = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const listMonthSpan = Calendar.map((mon, index) => {
      return <span onClick={() => {
        setSelectedDate(moment().year(year).month(index).date(1));
        setOpenSelectMonth(false);
      }}>{mon}</span>
    })
    return (<>
      <span onClick={() => setYear(year - 1)}>&lt;</span>
      <span>{year}</span>
      <span onClick={() => setYear(year + 1)}>&gt;</span>
      <hr />

      {listMonthSpan}
    </>
    )
  }

  const generate = () => {
    const today = selectedDate;
    const startWeek = today.clone().startOf('month').week();
    const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className={`row${endWeek - startWeek + 1}`} key={week}>
          {
            Array(7).fill(0).map((n, i) => {
              let current = today.clone().week(week).startOf('week').add(n + i, 'day')
              let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
              let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
              return (
                <div
                  className={`box  ${isSelected} ${isGrayed}`} key={i}
                  onClick={() => {
                    // 선택한 날짜로 이동
                    setSelectedDate(current)
                    // 오른쪽 일정 오픈
                    setOpenSchedule(true)
                  }}
                >
                  <span className={`text`}>
                    {current.format('D')}
                    <ul>
                      {/* 일정 유무 확인해서 <li>로 랜더 */}
                      {(data !== null) ?
                        data.map((obj) => {
                          if (obj.date !== null && obj.date.slice(0, 10) === current.format().slice(0, 10)) {
                            console.log(current.format().slice(0, 10));
                            return (
                              <li key={obj.id} className={obj.type}>
                                <hr />
                              </li>
                            )
                          }
                        })
                        : ""
                      }
                    </ul>
                  </span>
                </div>
              )
            })
          }
        </div>
      )
    }
    return calendar;
  }

  return (
    <div className="home">
      <div className="full_page">
        <div className={openSchedule ? "sideCalendar" : "Calendar"}>
          <div className="head">
            <button className="leftBtn" onClick={() => {
              let num = moment().month(month).format("M") - 2;
              setSelectedDate(moment().month(num).date(1))
            }}><ChevronLeftSharpIcon className={classes.icon} />
            </button>
            <span className="title" onClick={selectMonth} ref={ref}>{month}</span>
            <button className="rightBtn" onClick={() => {
              let num = moment().month(month).format("M");
              setSelectedDate(moment().month(num).date(1))
            }}><ChevronRightSharpIcon className={classes.icon} />
            </button>
          </div>
          {/* 월 선택 모달 */}
          <div className="selectMonth" style={openSelectMonth ? { display: "inline-block" } : { display: "none" }}>
            {monthModal()}
          </div>

          <div className="body">
            <div className="alertNextMonth">
              <Collapse in={open}>
                <Alert action={
                  <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false) }}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }>
                  <AlertTitle><div className="alertNextMonthTitle">{nextMonth[0] === undefined ? `이벤트가 아직 없네요!` : `다음달 ${nextMonth[0]}개의 이벤트가 있어요!`}</div></AlertTitle>
                  <span className="alertNextMonthContent">{nextMonth[2] === undefined ? `` : `지출 예상 금액: ${new Intl.NumberFormat().format(Number(nextMonth[1]))}원`}</span> <span className="alertNextMonthContent">{`지출 예상 선물: ${nextMonth[2]}개`}</span>
                </Alert>
              </Collapse>
            </div>
            <div className="row">
              {makeWeek()}
            </div>
            {generate()}
          </div>
        </div>

        {/* 오른쪽 일정 창 */}
        <div className={openSchedule ? "sideSchedule" : "none"}>
          <button className="closeSideSchedule" onClick={() => setOpenSchedule(false)}>✕</button>
          <h2 className="date">
            {selectedDate.format("M[/]D[(]ddd[)]")}
          </h2>
          <ul>
            {/* 일정 유무 확인해서 <li>로 랜더 */}
            {(data !== null) ?
              data.map((obj) => {
                if (obj.date !== null && obj.date.slice(0, 10) === selectedDate.format().slice(0, 10)) {
                  return (

                    <li key={obj.id}>
                      <div className={obj.type}>
                        {obj.event_target} {obj.type}
                        <div className="gift">{obj.gift[0] === "현금" ? obj.gift[0] + " " + new Intl.NumberFormat().format(Number(obj.gift[1])) + "원" : obj.gift[0] + " " + obj.gift[1]}</div>
                      </div>
                      <span className="transferIcon_home">
                        <span className="kakaobank">
                          <a href="kakaobank://">
                            <img src={kakaobank}></img>
                          </a>
                        </span>
                        <span className="toss">
                          <a href="supertoss://">
                            <img src={toss}></img>
                          </a>
                        </span>
                      </span>
                    </li>
                  )
                }
              })
              : ""
            }
          </ul>
          <div>
            <button className="add_schedule_sideSchedule"
              onClick={(e) => {
                e.preventDefault();
                setModal(!isOpen);
              }}
              ref={ref}
            >+ 일정추가</button>
          </div>
        </div>

        {/* 일정추가 모달 */}
        {/* <Modal userId={userId} isOpen={isOpen} setModal={setModal}
          setUseEffect={setUseEffect} scheduleDate={`${new Date(selectedDate).getFullYear()}-${new Date(selectedDate).getMonth() + 1}-${new Date(selectedDate).getDate()}`} /> */}
      </div>
    </div>
  );
  
}