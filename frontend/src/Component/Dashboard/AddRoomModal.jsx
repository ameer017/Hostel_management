import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const AddRoomModal = ({ onAddRoom, onClose }) => {
  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomCapacity: "",
    roomLocation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:3500/room/create-room`,
        roomData
      );
      console.log("Room added:", response.data);

      onAddRoom(response.data);

      onClose();
    } catch (error) {
      setError("Failed to add room. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Add New Room</h2>
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={roomData.roomNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomCapacity">Room Capacity:</label>
          <input
            type="text"
            id="roomCapacity"
            name="roomCapacity"
            value={roomData.roomCapacity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roomLocation">Room Location:</label>
          <input
            type="text"
            id="roomLocation"
            name="roomLocation"
            value={roomData.roomLocation}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}
        <div className="modal-actions">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? "Adding..." : "Add "}
          </button>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
