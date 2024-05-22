import React, { useState, useCallback, useContext } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput";
import { UserContext } from "../../../context/userContext";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleInputChange = useCallback((e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const loginUser = useCallback(
    (event) => {
      event.preventDefault();

      const { email, password } = formData;

      if (!email || !password) {
        setFormValidMessage("Oops! all fields are required");
        return;
      }

      setIsSubmitting(true);

      axios
        .post(`http://localhost:3500/admin/login`, formData)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          setIsSubmitting(false);
          toast.success("Login Successful")
          navigate("/homedash", { state: { user: response.data } });
        })
        .catch((error) => {
          setIsSubmitting(false);
          const message =
            error.response?.status === 400
              ? "Invalid Login Credentials"
              : "Server error!";
          setFormValidMessage(message);
        });
    },
    [formData, navigate, setUser]
  );

  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title">Admin Login</p>
        <form className="form" onSubmit={loginUser}>
          <div className="--dir-column">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="password">Password:</label>
            <PasswordInput
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button className="--btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
        {formValidMessage && (
          <p className="error-message">{formValidMessage}</p>
        )}
        <p>
          Don't have an account yet? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
