import React from "react";
import './Register.css'

const Login = () => {
  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title">Admin Login</p>
        <form className="form">
          

          <div className="--dir-column">
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              className="input"
              name="email"
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

         
          <button className="--btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
