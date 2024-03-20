import React from "react";
import "./HomeDash.css";
import { moe } from "../../assets";
const HomeDash = () => {
  return (
    <div className="--flex-center __homeDashCon">
      <div className="__paraCon">
        <h1 className="__paraHeader">Welcome back, Jackie!</h1>
      </div>

      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>
        <div className="__flex __boardss">
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

      <div className="--flex-center  __firstCon">
        <h4 className="__title">Recent Activity</h4>
        <div className="__users ">
          <div className="__firstUserPic">
            <img src={moe} alt="" />
          </div>

          <div className=" __userData ">
            <div>
              <h5>Jenny</h5>

              <p>Jenny has been checked out</p>
            </div>
            <p>3 mins ago</p>
          </div>
        </div>
        <div className="__users">
          <div className="__firstUserPic">
            <img src={moe} alt="" />
          </div>

          <div className="  __userData">
            <div>
              <h5>Jenny</h5>
              <p>Jenny has been checked in</p>
            </div>

            <p>3 mins ago</p>
          </div>
        </div>

        <div className="__users">
          <div className="__firstUserPic">
            <img src={moe} alt="" />
          </div>

          <div className="__userData">
            <div>
              <h5>Jenny</h5>

              <p>Jenny has been checked out</p>
            </div>
            <p>3 mins ago</p>
          </div>
        </div>
      </div>

      <div className="__lastCon">
        <h3 className="__lastTitle">Quick Actions</h3>
        <div>
          <button className="__addBtn">Add student</button>
          <button className="__attendBtn">Attendance</button>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
