import React, { useEffect, useState, useCallback, useContext } from "react";
import "./Register.css";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import PasswordInput from "../PasswordInput/PasswordInput";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/userContext";
import axios from "axios";

const AdminReg = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  const handleInputChange = useCallback((e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  useEffect(() => {
    const { password } = formData;
    setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
    setNum(/[0-9]/.test(password));
    setSChar(/[!,%,&,@,#,$,^,*,?,_,~]/.test(password));
    setPassLength(password.length > 5);
  }, [formData.password]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const { fullname, email, password, password2 } = formData;

      if (!fullname || !email || !password || !password2) {
        setFormValidMessage("Oops! all fields are required");
        return;
      }

      if (password !== password2) {
        setFormValidMessage("Password does not match!");
        return;
      }

      setIsSubmitting(true);

      axios
        .post(`http://localhost:3500/admin/register`, formData)
        .then((response) => {
          setUser(response.data);
          setIsSubmitting(false);
          setFormCompleted(true);
          toast.success("Registration Successful")
          navigate("/homedash", { state: { user: response.data } });
        })
        .catch((error) => {
          setIsSubmitting(false);
          const message =
            error.response?.status === 400
              ? "A user with the same email address already exists"
              : "Server error unable to process your registration";
          setFormValidMessage(message);
        });
    },
    [formData, navigate, setUser]
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title">Create an account</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="--dir-column">
                <label htmlFor="fullname">Full name:</label>
                <input
                  type="text"
                  className="input"
                  name="fullname"
                  value={formData.fullname}
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
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="--dir-column">
                <label htmlFor="password2">Confirm password:</label>
                <PasswordInput
                  placeholder="Confirm Password"
                  name="password2"
                  value={formData.password2}
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
                      {switchIcon(uCase)}&nbsp; Lowercase & Uppercase
                    </span>
                  </li>
                  <li>
                    <span className="indicator">
                      {switchIcon(num)}&nbsp; Number (0-9)
                    </span>
                  </li>
                  <li>
                    <span className="indicator">
                      {switchIcon(sChar)}&nbsp; Special Character (!@#$%^&*)
                    </span>
                  </li>
                  <li>
                    <span className="indicator">
                      {switchIcon(passLength)}&nbsp; At least 6 Characters
                    </span>
                  </li>
                </ul>
              </div>
              <button className="--btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Create account"}
              </button>
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
