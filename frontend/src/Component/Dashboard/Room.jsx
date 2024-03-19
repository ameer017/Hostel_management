import React, { useState } from "react";
import Sidebar from "./Sidebar";
import RoomTable from "./RommTable";

const roomsData = [
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
  {
    roomNumber: "102",
    capacity: 3,
    occupancy: 3,
    status: "Occupied",
    location: "Pinecrest Residence, Oakville",
  },
  {
    roomNumber: "102",
    capacity: 3,
    occupancy: 3,
    status: "Occupied",
    location: "Meadowbrook Inn, Bloomfield",
  },
];

const Room = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState(roomsData);
  const [filteredData, setFilteredData] = useState(roomsData); 

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = roomsData.filter(
      (room) =>
        room.capacity.toLowerCase().includes(term) ||
        room.status.toLowerCase().includes(term) ||
        room.location.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };


  const handleAddRoom = () => {
    // Implement logic to add a new room
  };

  const handleUpdateRoom = (roomNumber, newStatus) => {
    const updatedRooms = roomsData.map((room) =>
      room.roomNumber === roomNumber ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
  
    // Update filtered data as well
    const updatedFilteredData = filteredData.map((room) =>
      room.roomNumber === roomNumber ? { ...room, status: newStatus } : room
    );
    setFilteredData(updatedFilteredData);
  };

  const handleDeleteRoom = (roomNumber) => {
    const updatedRooms = roomsData.filter(
      (room) => room.id !== roomNumber
    );
    setRooms(updatedRooms);
    const updatedFilteredData = filteredData.filter(
      (room) => room.roomNumber !== roomNumber
    );
    setFilteredData(updatedFilteredData);
  };

  return (
    <div className="container --flex-start">
      <Sidebar />

      <div>
        <h1>Hostel Room Listing</h1>

        <input
          placeholder="Search by room number, status, or location"
          type="text"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <RoomTable
          rooms={rooms}
          onAddRoom={handleAddRoom}
          onUpdateRoom={handleUpdateRoom}
          onDeleteRoom={handleDeleteRoom}
        />
      </div>
    </div>
  );
};

export default Room;
