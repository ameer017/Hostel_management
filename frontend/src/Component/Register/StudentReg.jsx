import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  age: "",
  roomNum: "",
  g_name: "",
  g_email: "",
  email: "",
  gender: "",
  nationality: "",
};

const StudentReg = () => {
  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value)
    setFormData({ ...formData, [name]: value });
  };

  const registerStudent = async (e) => {
    e.preventDefault();
    const { name, age, roomNum, g_name, g_email, gender, nationality, email } =
      formData;

    if (
      !name ||
      !age ||
      !roomNum ||
      !g_name ||
      !g_email ||
      !gender ||
      !nationality ||
      !email
    ) {
      toast.error("All fields are required");
      return;
    }
    axios
    .post(`http://localhost:3500/students/registerStudent`, formData)
    .then((response) => {
      console.log(response); // Debug response
      setIsSubmitting(false);
      toast.success("Registration Successful");
      navigate("/studentdash");
    })
    .catch((error) => {
      console.error(error); // Debug error
      setIsSubmitting(false);
      const message =
        error.response?.status === 400
          ? "A Student with the same email address already exists"
          : "Server error unable to process your registration";
      setFormValidMessage(message);
      toast.error(message); // Display error toast
    });
  };

  return (
    <div className="form__">
      <div className="form-container">
        <p className="title">Register a new student</p>
        <form className="form" onSubmit={registerStudent}>
          <div className="--dir-column">
            <label htmlFor="name">Students Name:</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Enter name"
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              className="input"
              name="age"
              placeholder="Enter age"
              onChange={handleInputChange}
              value={formData.age}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="age">Email:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="yourname@gmail.com"
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              className="input"
              name="gender"
              placeholder="Male || Female"
              onChange={handleInputChange}
              value={formData.gender}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="nationality">Nationality:</label>
            <input
              type="text"
              className="input"
              name="nationality"
              placeholder="Enter nationality"
              onChange={handleInputChange}
              value={formData.nationality}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="roomNum">Room Number:</label>
            <input
              type="text"
              className="input"
              name="roomNum"
              placeholder="Enter room number"
              onChange={handleInputChange}
              value={formData.roomNum}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="g_name">Guardian&apos;s Name:</label>
            <input
              type="text"
              className="input"
              name="g_name"
              placeholder="Enter guardian's name"
              onChange={handleInputChange}
              value={formData.g_name}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="g_email">Guardian&apos;s Contact Email:</label>
            <input
              type="email"
              className="input"
              name="g_email"
              placeholder="Enter guardian's email"
              onChange={handleInputChange}
              value={formData.g_email}
            />
          </div>

          <button className="--btn" disabled={isSubmitting}>
            {isSubmitting ? "Adding Student..." : "Add Student"}
          </button>
        </form>

        {formValidMessage && (
          <p className="error-message">{formValidMessage}</p>
        )}
      </div>
    </div>
  );
};

export default StudentReg;
