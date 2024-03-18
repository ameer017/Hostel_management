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

        <div className="table ">
          <table className="table_wrapper">
            <thead className="table__head">
              <tr className="table__row">
                <th className="same_class">Student Name</th>
                <th className="same_class">Email</th>
                <th className="same_class">ID Number</th>
                <th className="same_class">Gender</th>
                <th className="same_class">Age</th>
                <th className="same_class">Nationality</th>
                <th className="same_class">Actions</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {studentsData.map((student, index) => (
                <tr key={index} className="table__row">
                  <td className="same_class">{student.name}</td>
                  <td className="same_class">{student.email}</td>
                  <td className="same_class">{student.idNumber}</td>
                  <td className="same_class">{student.gender}</td>
                  <td className="same_class">{student.age}</td>
                  <td className="same_class">{student.nationality}</td>
                  <td className="same_class">
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
