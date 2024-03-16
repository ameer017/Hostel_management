import React from "react";
import "./AdminReg.css";

const AdminReg = () => {
  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title">Create an account</p>
        <form className="form">
          <div className="--dir-column">
            <label htmlFor="name">Full name:</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Email:</label>
            <input
              type="text"
              className="input"
              name="age"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Password:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Confirm password:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button className="--btn">Create account</button>
        </form>
      </div>
    </div>
  );
};

export default AdminReg;
