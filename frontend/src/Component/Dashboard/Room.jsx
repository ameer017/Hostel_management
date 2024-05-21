import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import RoomTable from "./RommTable"; // Corrected typo from RommTable to RoomTable
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FILTER_ROOM, selectRooms } from "../../../redux/features/filterSlice";
import { deleteRoom, getRooms, addRoom, updateRoom } from "../../../redux/features/room/roomSlice";

const Room = () => {
  const [search, setSearch] = useState("");
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);

  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);

  const filteredRooms = useSelector(selectRooms);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const handleAddRoom = (newRoomData) => {
    dispatch(addRoom(newRoomData));
    dispatch(getRooms());
  };

  const handleUpdateRoom = (updatedRoomData) => {
    dispatch(updateRoom(updatedRoomData));
    dispatch(getRooms());
  };

  const removeRoom = async (id) => {
    await dispatch(deleteRoom(id));
    dispatch(getRooms());
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

  useEffect(() => {
    dispatch(FILTER_ROOM({ rooms, search }));
  }, [dispatch, rooms, search]);

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
                  rooms={filteredRooms}
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
