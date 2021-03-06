import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './MyPage.scss';
import axios from "axios";
import Chart from './Mypage_Chart';
import cookie from 'react-cookies';
import CsvDownloader from 'react-csv-downloader';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
  icon: {
      fontSize : 20,
      borderRadius : 50,
      '@media(min-width: 1px) and (max-width:  757px)': {
        fontSize : 18,
      }
  }
}))

function MyPage(props:any) {
  const classes = useStyles();

  const { email, name, setIsLogin, setEmail, setName, history } = props;

  const [openName, setOpenName] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const [isRightPassword, setIsRightPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const signoutHandler = () => {
    console.log('signoutHandler');
    axios.post('https://don-forget-server.com/user/signout', {})
      .then(res => {
        setIsLogin(false);
        setEmail("");
        setName("");
        window.sessionStorage.clear();
        cookie.remove('id');
      })
      .then(() => { history.push('/intro') })
      .catch((err) => console.log(err));
  }

  const changeNameHandler = (e:any) => {
    e.preventDefault();
    console.log(changeName);
    axios.post(`https://don-forget-server.com/user/changename/${window.sessionStorage.getItem("id")}`, {
      name: changeName
    })
      .then(res => {
        console.log(res.data);
        setOpenName(false);
        setName(changeName);
        window.sessionStorage.setItem("name", res.data.name);
      })
      .catch((err) => console.log(err));
  }

  const checkPasswordHandler = () => {
    axios.post(`https://don-forget-server.com/user/confirmuser/${window.sessionStorage.getItem("id")}`, {
      password: oldPassword
    })
      .then(res => {
        console.log(res.data);
        // ??? ???????????? ?????? ??? ??????
        setIsRightPassword(true);
      })
      .catch((err) => {
        console.log(err)
        alert("??????????????? ????????????.")
      });
  }

  const changePasswordHandler = () => {
    if (newPassword === newPasswordCheck) {
      axios.post(`https://don-forget-server.com/user/changepassword/${window.sessionStorage.getItem("id")}`, {
        password: newPassword
      })
        .then(res => {
          console.log(res.data);
          alert("??????????????? ?????????????????????.");
        })
        .then(() => {
          setOpenPassword(false);
          setIsRightPassword(false);
        })
        .catch((err) => console.log(err));
    }
    else {
      alert("??????????????? ???????????? ????????????.");
    }
  }

  const columns = [{
    id: '??????',
    displayName: '??????'
  }, {
    id: '????????? ??????',
    displayName: '????????? ??????'
  }, {
    id: '????????? ??????',
    displayName: '????????? ??????'
  }, {
    id: '?????? ?????? ??????',
    displayName: '?????? ?????? ??????'
  }, {
    id: 'give ?????? take',
    displayName: 'give ?????? take'
  }]

  const list : any[] = [];
  axios.get(`https://don-forget-server.com/schedule/${window.sessionStorage.getItem("id")}`)
  .then(res => {
    res.data.map((element:any) => {
      list.push({
        "??????": element.date,
        "????????? ??????": element.type,
        "????????? ??????": element.event_target,
        "?????? ?????? ??????": element.gift[1],
        "give ?????? take": element.giveandtake
      })
    })
  })

  return (
    <div className="mypage">
      <div className="full_page">
        <h1>????????? ?????? ?????? 
        </h1>
        <div className="chart">
          <Chart />
        </div>
        <CsvDownloader
            filename="?????????_donforget"
            separator=";"
            wrapColumnChar="'"
            columns={columns}
            datas={list}
            className= "backCsvMobile"
           >
            <button  className = "csv"> ????????? ?????? ????????? ????????????(.csv)</button>
            <DescriptionIcon className={classes.icon}/>
            </CsvDownloader>
        <div className="userInfo">
          <h1>????????? ??????</h1>
          <div>?????? : {openName ? <>
            <input type="text" placeholder="????????? ????????? ??????????????????."
              onChange={(e) => setChangeName(e.target.value)}></input>
            <button className="clickChangeNameBtn" onClick={changeNameHandler}>??????</button>
          </> : name}</div>
          <div>????????? : {email.split('-')[1] !== undefined ? email.split('-')[1] : email}</div>
          <div className="mypage_buttons">
            <button className="changeBtn" onClick={() => setOpenName(!openName)}>?????? ??????</button>
            <button className="changeBtn" onClick={() => setOpenPassword(!openPassword)}>???????????? ??????</button>
            <button className="changeBtn" onClick={signoutHandler}>????????????</button>
          </div>
        </div>

        <div className={openPassword ? "changePasswordModal" : "none"}>
          <div className="changePW_content">

            <h3>???????????? ????????????</h3>

            <h4>Step 1.</h4>
            <input type="password" placeholder="?????? ????????????"
              onChange={(e) => setOldPassword(e.target.value)}></input>
            <button onClick={() => setOpenPassword(false)}>??????</button>
            <button onClick={checkPasswordHandler}>??????</button>
            <div className={isRightPassword ? "newPw" : "none"}>
              <h4>Step 2.</h4>
              <input type="password" placeholder="??? ????????????"
                onChange={(e) => setNewPassword(e.target.value)}></input>
              <input type="password" placeholder="??? ???????????? ??????"
                onChange={(e) => setNewPasswordCheck(e.target.value)}></input>
              <button onClick={() => setOpenPassword(false)}>??????</button>
              <button onClick={changePasswordHandler}>??????</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MyPage);
