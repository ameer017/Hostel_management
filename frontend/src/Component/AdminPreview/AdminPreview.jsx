import React from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";

const userData = [
  { name: "Nafisat", email: "john@example.com", role: "Admin", id: 1 },
  { name: "Zainab ", email: "Zainab@example.com", role: "User", id: 2 },
  { name: "Basirat", email: "Basirat@example.com", role: "Member", id: 3 },
  { name: "Azeez", email: "Azeez@example.com", role: "Admin", id: 4 },
  { name: "Soliu", email: "Soliu@example.com", role: "Member", id: 5 },
];

const AdminPreview = () => {
  return (
    <div className="__prevCon">
      <h2 className="__prevHeader">Admins</h2>

      <div className="__prevSearchCon">
        <CiSearch className="__prevSearchIcon" />
        <input
          type="text"
          className="__prevSearch"
          placeholder="Search by name or email"
        />
      </div>

      <div className="__prevList">
        <UserTable data={userData} />
      </div>

      <div className="__inviteBtnCon">
        <button className="__inviteBtn">Invite Admin</button>
      </div>
    </div>
  );
};

export default AdminPreview;
