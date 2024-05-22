import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const EditStatusModal = ({ room, onClose, onUpdateRoom }) => {
  const [newStatus, setNewStatus] = useState(room.roomStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const updateResponse = await axios.patch(
        `http://localhost:3500/room/update-room/${room._id}`,
        { roomStatus: newStatus }
      );
      console.log("Room updated:", updateResponse.data);

      // Update the room data in the parent component
      onUpdateRoom(updateResponse.data);

      onClose();
    } catch (error) {
      setError("Failed to update room status. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Room Status</h2>
        <p className="room-number">Room Number: {room.roomNumber}</p>
        <label htmlFor="status" className="status-label">
          New Status:
        </label>
        <div className="right">
          <input
            type="text"
            id="status"
            className="search"
            value={newStatus}
            onChange={handleStatusChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-group">
          <button className="save-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;
