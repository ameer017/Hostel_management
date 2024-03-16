import React from "react";
import "./Register.css";

const StudentReg = () => {
  return (
    <div className=" form__ --100vh">
      <div className="form-container">
        <p className="title">Register a new student</p>
        <form className="form">
          <div className="--dir-column">
            <label htmlFor="name">Students Name:</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Enter name"
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Age:</label>
            <input
              type="text"
              className="input"
              name="age"
              placeholder="Enter age"
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Room Number:</label>
            <input
              type="number"
              className="input"
              name="room"
              placeholder="Enter room number"
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Contact Email:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Enter email"
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Guardian&apos;s Name:</label>
            <input
              type="text"
              className="input"
              name="guardian"
              placeholder="Enter name"
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Guardian&apos;s Contact Email:</label>
            <input
              type="email"
              className="input"
              name="g_email"
              placeholder="Enter email"
            />
          </div>

          <button className="--btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default StudentReg;
