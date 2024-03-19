import React from "react";
import Sidebar from "./Sidebar";
import RoomTable from "./RommTable";

const rooms = [
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
  const handleAddRoom = () => {
    // Implement logic to add a new room
  };

  const handleUpdateRoom = (updatedRoom) => {
    // Implement logic to update the room
  };

  const handleDeleteRoom = (roomToDelete) => {
    // Implement logic to delete the room
  };

  return (
    <div className="container --flex-start">
      <Sidebar />

      <div>
        <h1>Hostel Room Listing</h1>
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
