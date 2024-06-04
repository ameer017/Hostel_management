import React, { useState } from "react";
import axios from "axios";

const UpdateCheckInStatus = ({ student, onClose }) => {
  const [action, setAction] = useState("");

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/students/checkInStatus",
        {
          studentId: student._id,
          action,
        }
      );
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Check-In Status</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Action</label>
            <select value={action} onChange={handleActionChange}>
              <option value="">Select an action</option>
              <option value="checkIn">Check In</option>
              <option value="checkOut">Check Out</option>
            </select>
          </div>
          <button type="submit">Update Status</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCheckInStatus;
