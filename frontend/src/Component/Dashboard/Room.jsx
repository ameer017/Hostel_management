import React, { useState } from "react";
import Sidebar from "./Sidebar";
import RoomTable from "./RommTable";


const initialRooms = [
  {
    roomNumber: "101",
    capacity: 4,
    occupancy: 2,
    status: "Available",
    location: "Lakeside Manor, Riverside",
  },
  {
    roomNumber: "102",
    capacity: 3,
    occupancy: 3,
    status: "Occupied",
    location: "Hillview Hostel, Springfield",
  },
  {
    roomNumber: "103",
    capacity: 4,
    occupancy: 3,
    status: "Available",
    location: "Maplewood Lodge, Greenfield",
  },
];

const Room = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState(initialRooms);
  const [filteredData, setFilteredData] = useState(initialRooms);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = rooms.filter(
      (room) =>
        room.roomNumber.toLowerCase().includes(term) ||
        room.status.toLowerCase().includes(term) ||
        room.location.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleAddRoom = (newRoomData) => {
    setRooms([...rooms, newRoomData]);
    setFilteredData([...rooms, newRoomData]);
  };
  

  const handleUpdateRoom = (roomNumber, newStatus) => {
    const updatedRooms = rooms.map((room) =>
      room.roomNumber === roomNumber ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };

  const handleDeleteRoom = (roomNumber) => {
    const updatedRooms = rooms.filter(
      (room) => room.roomNumber !== roomNumber
    );
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };

  return (
    <div className="flex-gap">

      <Sidebar />
    <div className=" --flex-start mt" >
      <div>
        <h1>Hostel Room Listing</h1>
        <p>Search students</p>

        <input
          placeholder="Search by room number, status, or location"
          type="text"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <RoomTable
          rooms={filteredData}
          onAddRoom={handleAddRoom}
          onUpdateRoom={handleUpdateRoom}
          onDeleteRoom={handleDeleteRoom}
        />
      </div>
    </div>
    </div>
  );
};

export default Room;
