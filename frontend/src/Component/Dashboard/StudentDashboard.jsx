import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const dashboard = [
  { title: "Dashboard", url: "/homedash" },
  { title: "Students", url: "/studentdash" },
  { title: "Rooms", url: "/room" },
  { title: "Reports", url: "/report" },
];

const StudentDashboard = () => {
  return (
    <div className="container --flex-start">
      <div className="left">
        {dashboard.map(({ i, title, url }) => (
          <div className="--flex-center  --dir-column">
            <Link to={url}> {title} </Link>
          </div>
        ))}
      </div>
      <div className="right"></div>
    </div>
  );
};

export default StudentDashboard;
