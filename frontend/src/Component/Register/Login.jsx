import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET, login } from "../../../redux/features/auth-admin/adminSlice";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput";
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message, isError, twoFactor } =
    useSelector((state) => state.admin);

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    // console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/homedash");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title">Admin Login</p>
        <form className="form" onSubmit={loginUser}>
          <div className="--dir-column">
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="name">Password:</label>
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <button className="--btn">Sign In</button>
        </form>
        <p>
          Don&apos;t have an account yet? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
