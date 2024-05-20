import React, { useEffect, useState } from "react";
import "./Register.css";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { RESET, register } from "../../../redux/features/auth-admin/adminSlice";
import PasswordInput from "../PasswordInput/PasswordInput";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const AdminReg = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    // console.log(userData);
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/homedash");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title">Create an account</p>
            <form className="form" onSubmit={registerUser}>
              <div className="--dir-column">
                <label htmlFor="name">Full name:</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={name}
                  placeholder="Enter your full name"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="password">Password:</label>
                <PasswordInput
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="password">Confirm password:</label>
                <PasswordInput
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error("Cannot paste into input field");
                    return false;
                  }}
                />
              </div>

              <div className="card">
                <ul className="form-list">
                  <li>
                    <span className="indicator">
                      {switchIcon(uCase)}
                      &nbsp; Lowercase & Uppercase
                    </span>
                  </li>
                  <li>
                    <span className="indicator">
                      {switchIcon(num)}
                      &nbsp; Number (0-9)
                    </span>
                  </li>
                  <li>
                    <span className="indicator">
                      {switchIcon(sChar)}
                      &nbsp; Special Character (!@#$%^&*)
                    </span>
                  </li>
                  <li>
                    <span className="indicator">
                      {switchIcon(passLength)}
                      &nbsp; At least 6 Character
                    </span>
                  </li>
                </ul>
              </div>

              <button className="--btn">Create account</button>
            </form>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminReg;
