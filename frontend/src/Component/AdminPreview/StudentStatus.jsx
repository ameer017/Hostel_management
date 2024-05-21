import React, { useState, useEffect } from "react";
import "./AdminPreview.css";
import { moe } from "../../assets";

const StudentStatus = ({ students }) => {
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const activities = students.map((student) => {
      const currentTime = new Date();
      const studentTime = new Date(student.timestamp);
      const timeDiff = Math.abs(currentTime - studentTime);
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      return {
        name: student.name,
        status: student.status,
        timeAgo: `${hours}h ${minutes}m ago`,
        img: student.photo,
      };
    });
    setRecentActivities(activities);
  }, [students]);

  const getStatusMessage = (status) => {
    switch (status) {
      case "active":
        return "has been active";
      case "checked-in":
        return "has been checked in";
      case "checked-out":
        return "has been checked out";
      case "inactive":
        return "is inactive";
      default:
        return "status unknown";
    }
  };

  return (
    <div className="--flex-center  __firstCon">
      <h4 className="__title">Recent Activity</h4>
      {recentActivities.map((activity, index) => (
        <div key={index} className="__users">
          <div className="__firstUserPic">
            <img src={activity.img} alt="" />
          </div>
          <div className="__userData">
            <div>
              <h5>{activity.name}</h5>
              <p>
                {activity.name} {getStatusMessage(activity.status)}
              </p>
            </div>
            <p>{activity.timeAgo}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentStatus;
