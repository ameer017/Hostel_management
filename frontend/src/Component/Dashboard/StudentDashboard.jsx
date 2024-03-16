import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const dashboard = [
  { title: "Dashboard", url: "/homedash" },
  { title: "Students", url: "/studentdash" },
  { title: "Rooms", url: "/room" },
  { title: "Reports", url: "/report" },
];

const StudentDashboard = () => {
  const activeIndex = 1;

  return (
    <div className="container --flex-start">
      <div className="left">
        {dashboard.map(({ i, title, url }, index) => (
          <div className="--flex-center  --dir-column" key={index}>
            <Link
              to={url}
              className={index === activeIndex ? "active-link" : ""}
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
      <div className="right">
        <p>Students</p>
        <p>Search students</p>

        <input
          placeholder="Search by name, email, or ID number"
          type="text"
          className="search"
        />

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>ID Number</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Nationality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jessica Smith</td>
                <td>jessica.smith@gmail.com</td>
                <td>12345</td>
                <td>Female</td>
                <td>20</td>
                <td>American</td>
                <td>
                  <RiDeleteBin6Line size={25} color="red" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
