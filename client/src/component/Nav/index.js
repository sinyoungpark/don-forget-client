import React from "react";
import "./Nav.scss";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListIcon from "@material-ui/icons/List";
import Avatar from "@material-ui/core/Avatar";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  curpath: {
    backgroundColor: "#ffffff",
    color: "#ff4705",
    border: "2px solid white",
    width: "37%",
    height: "8%",
    borderRadius: "20px",
    marginBottom: "100px",
    fontSize: "large",
    "z-index": "99",
    "@media(min-width: 1px) and (max-width:  757px)": {
      marginBottom: "0",
      height: "85%",
      width: "90%",
      borderRadius: "0",
      padding: "6%",
    },
  },
  icon: {
    backgroundColor: "#3b23a6",
    padding: "6%",
    marginBottom: "100px",
    "&:hover": {
      backgroundColor: "#7354ff",
    },
    "@media(min-width: 1px) and (max-width:  757px)": {
      marginBottom: "0px",
      padding: "0%",
      width: "80px",
      height: "80px",
    },
  },
}));

export default function Nav() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div
      className={
        location.pathname === "/signin" || location.pathname === "/signup"
          ? "topnav fixed"
          : location.pathname === "/"
          ? "topnav"
          : "sidenav"
      }
    >
      <Link to="/home" replace={true}>
        <Avatar
          className={
            location.pathname === "/home" ? classes.curpath : classes.icon
          }
        >
          <CalendarTodayIcon />
        </Avatar>
      </Link>
      <Link to="/schedule" replace={true}>
        <Avatar
          className={
            location.pathname === "/schedule" ? classes.curpath : classes.icon
          }
        >
          <ListIcon />
        </Avatar>
      </Link>
      <Link to="/gift" replace={true}>
        <Avatar
          className={
            location.pathname === "/gift" ? classes.curpath : classes.icon
          }
        >
          <CardGiftcardIcon />
        </Avatar>
      </Link>
      <Link to="/mypage">
        <Avatar
          className={
            location.pathname === "/mypage" ? classes.curpath : classes.icon
          }
        >
          <AccountCircleIcon />
        </Avatar>
      </Link>
      <Link to="/signin" replace={true} className="loginBtn">
        LOGIN
      </Link>
    </div>
  );
}
