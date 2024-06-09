import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateCheckInStatus = ({ student, onClose }) => {
  const [action, setAction] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (student.room) {
        try {
          const response = await axios.get(`http://localhost:3500/room/get-single-room/${student.room}`);
          setCurrentRoomNumber(response.data.roomNumber);
        } catch (error) {
          console.error("Error fetching room details:", error);
        }
      }
    };

    fetchRoomDetails();
  }, [student.room]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/students/checkInStatus",
        {
          studentId: student._id,
          action,
          roomNumber
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
        <p>Current Status: {student.checkedIn ? "Checked In" : "Checked Out"}</p>
        <p>Current Room: {currentRoomNumber || "Not Assigned"}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Room Number</label>
            <input
              type="text"
              value={roomNumber}
              onChange={handleRoomNumberChange}
              placeholder="Enter room number"
            />
          </div>
          <div>
            <label>Action</label>
            <select value={action} onChange={handleActionChange}>
              <option value="">Select an action</option>
              <option value="checkIn" disabled={student.checkedIn}>
                Check In
              </option>
              <option value="checkOut" disabled={!student.checkedIn}>
                Check Out
              </option>
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
