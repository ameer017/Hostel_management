import React, { useState } from "react";
import "./Dashboard.css";

const AddRoomModal = ({ onAddRoom, onClose }) => {
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomCapacity: "",
    roomStatus: "",
    roomLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddRoom(newRoom);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content --flex-start --dir-column">
        <h2 className="modal-title">Add New Room</h2>
        <label htmlFor="roomNumber" className="room-label">
          Room Number:
        </label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={newRoom.roomNumber}
          onChange={handleChange}
          className="input-field"
        />
        <label htmlFor="capacity" className="room-label">
          Capacity:
        </label>
        <input
          type="text"
          id="capacity"
          name="roomCapacity"
          value={newRoom.roomCapacity}
          onChange={handleChange}
          className="input-field"
        />
        
        <label htmlFor="status" className="room-label">
          Status:
        </label>
        <input
          type="text"
          id="status"
          name="roomStatus"
          value={newRoom.roomStatus}
          onChange={handleChange}
          className="input-field"
        />
        <label htmlFor="location" className="room-label">
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="roomLocation"
          value={newRoom.roomLocation}
          onChange={handleChange}
          className="input-field"
        />
        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
