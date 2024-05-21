import React from "react";
import "./HomeDash.css";
import { moe } from "../../assets";
import { Link } from "react-router-dom";

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const HomeDash = () => {

  const activities = [
    {
      userPic: moe,
      userName: "Jenny",
      action: "checked out",
      time: "3 mins ago"
    },
    {
      userPic: moe,
      userName: "Jenny",
      action: "checked in",
      time: "3 mins ago"
    },
    {
      userPic: ellp,
      userName: "Jenny",
      action: "checked out",
      time: "3 mins ago"
    }
  ];
  return (
    <div className="--flex-center __homeDashCon">
      <div className="__paraCon">
        <h1 className="__paraHeader">Welcome back, Jackie!</h1>
      </div>

      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>
        <div className="__flex __boards">
          <div className="__board">
            <p className="__boardHead">120</p>
            <p className="__boardDetails">Total students</p>
          </div>
          <div className="__board">
            <p className="__boardHead">100</p>
            <p className="__boardDetails">Active students</p>
          </div>
          <div className="__board">
            <p className="__boardHead">20</p>
            <p className="__boardDetails">Inactive students</p>
          </div>
          <div className="__board">
            <p className="__boardHead">
              $20,000 <br />{" "}
            </p>
            <p className="__boardDetails">Total revenue</p>
          </div>
        </div>
      </div>


<div className="--flex-center __firstCon">
      <h4 className="__title">Recent Activity</h4>
      {activities.map((activity, index) => (
        <div className="__users" key={index}>
          <div className="__firstUserPic">
            <img src={activity.userPic } alt="" />
          </div>

          <div className="__userData">
            <div> 
              <h5>{activity.user}</h5>
              <p>{activity.action}</p>
            </div>
            <p>{activity.time}</p> 
          </div>
        </div>
      ))}
    </div>


      <div className="__lastCon">
        <h3 className="__lastTitle">Quick Actions</h3>
        <div className="__homeBtn">
          <button className="__addBtn">
            <Link to="/studentreg">Add student</Link>
          </button>
          <button className="__attendBtn">
            <Link to="/attendance">Attendance</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
