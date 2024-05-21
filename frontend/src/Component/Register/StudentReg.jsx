import React, { useEffect, useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  RESET,
  addStudent,
} from "../../../redux/features/student/studentSlice";

const initialState = {
  name: "",
  age: "",
  roomNumber: "",
  g_name: "",
  g_email: "",
  photo: "",
  gender: "",
  nationality: "",
};

const cloud_name = "";  // add your cloud name
const upload_preset = "";  // add your upload preset

const StudentReg = () => {
  const [formData, setFormData] = useState(initialState);
  const [studentImage, setStudentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { name, age, roomNumber, g_name, g_email, gender, nationality } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setStudentImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const { isLoading, isSuccess, message } = useSelector((state) => state.student);

  const registerStudent = async (e) => {
    e.preventDefault();
    let imageURL = "";

    if (studentImage) {
      try {
        const image = new FormData();
        image.append("file", studentImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/zinotrust/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url;
      } catch (error) {
        toast.error("Image upload failed");
        return;
      }
    }

    if (!name || !age || !roomNumber || !g_name || !g_email || !gender || !nationality) {
      toast.error("All fields are required");
      return;
    }

    const studentData = {
      ...formData,
      photo: imageURL || formData.photo,
    };

    dispatch(addStudent(studentData));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/studentdash");
      dispatch(RESET());
    }
  }, [isSuccess, dispatch, navigate]);

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
              value={name}
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
              value={age}
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
              value={gender}
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
              value={nationality}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="roomNumber">Room Number:</label>
            <input
              type="number"
              className="input"
              name="roomNumber"
              placeholder="Enter room number"
              onChange={handleInputChange}
              value={roomNumber}
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
              value={g_name}
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
              value={g_email}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="photo">Student Photo:</label>
            <input
              type="file"
              className="input"
              name="photo"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button className="--btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentReg;
