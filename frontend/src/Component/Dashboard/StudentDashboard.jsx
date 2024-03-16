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

const studentsData = [
  {
    name: "Jessica Smith",
    email: "jessica.smith@gmail.com",
    idNumber: "12345",
    gender: "Female",
    age: 20,
    nationality: "American",
  },
  {
    name: "John Doe",
    email: "john.doe@gmail.com",
    idNumber: "67890",
    gender: "Male",
    age: 22,
    nationality: "British",
  },
  {
    name: "Maria Garcia",
    email: "maria.garcia@gmail.com",
    idNumber: "54321",
    gender: "Female",
    age: 25,
    nationality: "Spanish",
  },
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
              {studentsData.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.idNumber}</td>
                  <td>{student.gender}</td>
                  <td>{student.age}</td>
                  <td>{student.nationality}</td>
                  <td>
                    <RiDeleteBin6Line size={25} color="red" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
