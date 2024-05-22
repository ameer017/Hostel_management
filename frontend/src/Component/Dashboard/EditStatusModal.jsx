import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Dashboard.css';
import { updateRoom } from '../../../redux/features/room/roomSlice';

const EditStatusModal = ({ room, onClose }) => {
  const [newStatus, setNewStatus] = useState(room.roomStatus);
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = () => {
    const roomData = {
      id: room._id,
      roomNumber: room.roomNumber,
      roomStatus: newStatus,
      roomCapacity: room.roomCapacity,
      roomOccupancy: room.roomOccupancy,
      roomLocation: room.roomLocation,
    };

    dispatch(updateRoom(roomData));
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Room Status</h2>
        <p className="room-number">Room Number: {room.roomNumber}</p>
        <label htmlFor="status" className="status-label">New Status:</label>
        <div className="right">
          <input type="text" id="status" className="search" value={newStatus} onChange={handleStatusChange} />
        </div>
        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>Save</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;
