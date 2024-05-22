import React, { useEffect, useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_ADMIN,
  selectAdmins,
} from "../../../redux/features/filterSlice";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../../../redux/features/auth-admin/adminSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminPreview = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { admins } = useSelector((state) => state.admin);
  const filteredData = useSelector(selectAdmins);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleUpdateRole = (userData) => {
    dispatch(updateUser(userData));
    dispatch(getUsers());
  };

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Deletion cancelled"),
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(FILTER_ADMIN({ admins, search }));
  }, [dispatch, admins, search]);

  return (
    <div className="__prevCon">
      <h2 className="__prevHeader">Admins</h2>

      <div className="__prevSearchCon">
        <CiSearch className="__prevSearchIcon" />
        <input
          type="text"
          className="__prevSearch"
          placeholder="Search by name, email, or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="__prevList">
        <UserTable data={filteredData} onDelete={confirmDelete} onUpdateRole={handleUpdateRole}/>
      </div>
    </div>
  );
};

export default AdminPreview;
