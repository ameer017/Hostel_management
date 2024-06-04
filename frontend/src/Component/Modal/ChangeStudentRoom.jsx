import React, { useState } from 'react';
import axios from 'axios';

const ChangeStudentRoom = ({ student, onClose }) => {
  const [newRoomNum, setNewRoomNum] = useState("");

  const handleChange = (e) => {
    setNewRoomNum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3500/students/changeRoom", {
        studentId: student._id,
        newRoomNum,
      });
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Error changing room:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change Student Room</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>New Room Number</label>
            <input type="text" value={newRoomNum} onChange={handleChange} />
          </div>
          <button type="submit">Change Room</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeStudentRoom;
