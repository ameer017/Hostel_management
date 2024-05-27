import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import RoomTable from "./RommTable";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import useAuthRedirect from "../../../context/useAuth";

const Room = () => {
  useAuthRedirect()
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState();
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/room/get-all-room`
        );

        setRoomData(response.data);
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.status === 400) {
          setMessage("Cannot fetch data");
        } else {
          setMessage("Server error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoom();
  }, []);

  useEffect(() => {
    const filteredRooms = roomData.filter((res) => {
      const roomLocation = res.roomLocation?.toLowerCase() || "";
      const roomStatus = res.roomStatus?.toLowerCase() || "";
      return (
        roomLocation.includes(search.toLowerCase()) ||
        roomStatus.includes(search.toLowerCase())
      );
    });
    setSearchResults(filteredRooms);
  }, [roomData, search]);

  const handleAddRoom = (newRoomData) => {
    setRoomData((prevData) => [...prevData, newRoomData]);
  };

  const handleUpdateRoom = (updatedRoomData) => {
    setRoomData((prevData) =>
      prevData.map((room) =>
        room._id === updatedRoomData._id ? updatedRoomData : room
      )
    );
  };
  
  
  const removeRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/room/delete-room/${id}`);
      setRoomData((prevRoomData) => prevRoomData.filter((room) => room._id !== id));
    } catch (error) {
      console.error("Failed to delete room", error);
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Room",
      message: "Are you sure to delete this room?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeRoom(id),
        },
        {
          label: "Cancel",
          onClick: () => console.log("Delete canceled"),
        },
      ],
    });
  };

  return (
    <>
      <div>
        {isSidebarToggle && (
          <div className="mobile-side-nav">
            <Sidebar />
          </div>
        )}

        <div className="--flex-justify-between">
          <div className="desktop-side-nav">
            <Sidebar />
          </div>

          <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">
            <main className="--flex-justify-center w-full">
              <div className="right dash-main">
                <div className="--flex-justify-between">
                  <h1>Hostel Room Listing</h1>

                  {isSidebarToggle ? (
                    <IoCloseOutline
                      className="sidebar-toggle-iconB"
                      onClick={() => setIsSidebarToggle(false)}
                    />
                  ) : (
                    <IoMenu
                      className="sidebar-toggle-iconB"
                      onClick={() => setIsSidebarToggle(true)}
                    />
                  )}
                </div>
                <input
                  placeholder="Search by room number, status, or location"
                  type="text"
                  className="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <RoomTable
                  rooms={searchResults}
                  onAddRoom={handleAddRoom}
                  onUpdateRoom={handleUpdateRoom}
                  onDeleteRoom={confirmDelete}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
