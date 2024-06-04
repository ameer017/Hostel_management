import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";

const StudentDashboard = () => {
  useAuthRedirect();
  const [search, setSearch] = useState("");
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3500/students/");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchStudents();
  }, []);

  const updateCheckIn = async() => {
    try {
      const response = await axios.patch("http://localhost:3500/students/checkInStatus")
    } catch (error) {
      console.log("Error updating:", error)
    }
  }

  const removeUser = async (_id) => {
    try {
      console.log(`Deleting student with id: ${_id}`);
      const response = await axios.delete(`http://localhost:3500/students/delete-student/${_id}`);
      console.log(response.data); // Log response from server

      // Filtering out the deleted student from the data
      setData((prevData) => prevData.filter((student) => student._id !== _id));
      console.log('Student removed from local state.');

      // Setting the success message
      setMessage("Student deleted successfully");
    } catch (error) {
      // Setting the error message
      setMessage("Failed to delete");
      console.error("Error deleting:", error);
    }
  };

  const confirmDelete = (_id) => {
    confirmAlert({
      title: "Delete This Student",
      message: "Are you sure to delete this student?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(_id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Deletion cancelled"),
        },
      ],
    });
  };

  const filteredData = data.filter(
    (item) =>
      item.nationality.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {isSidebarToggle && (
        <div className="mobile-side-nav">
          <Sidebar />
        </div>
      )}

      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
          <Sidebar />
        </div>

        <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right dash-main">
              <div className="--flex-justify-between">
                <p>Students</p>
                {isSidebarToggle ? (
                  <IoCloseOutline
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSidebarToggle(false)}
                  />
                ) : (
                  <IoMenu
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSidebarToggle(true)}
                  />
                )}
              </div>

              <p>Search students</p>

              <input
                placeholder="Search by name, email, or ID number"
                type="text"
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="table">
                <table className="table_wrapper ">
                  <thead className="table__head">
                    <tr className="table__row">
                      <th className="same_class">Student Name</th>
                      <th className="same_class">Email</th>
                      <th className="same_class">ID Number</th>
                      <th className="same_class">Age</th>
                      <th className="same_class">Nationality</th>
                      <th className="same_class">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {filteredData.map((student) => (
                      <tr key={student._id} className="table__row">
                        <td className="same_class">{student.name}</td>
                        <td className="same_class">{student.email}</td>
                        <td className="same_class">{student._id}</td>
                        <td className="same_class">{student.age}</td>
                        <td className="same_class">{student.nationality}</td>
                        <td className="same_class">
                          <RiDeleteBin6Line
                            size={25}
                            color="red"
                            onClick={() => confirmDelete(student._id)}
                          />
                          &nbsp;&nbsp;
                          <FaPenFancy
                            size={25}
                            color="blue"
                            onClick={() => confirmDelete(student._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn-secondary">
                <Link to="/studentreg">Add a student</Link>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
