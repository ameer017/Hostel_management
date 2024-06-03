import React, { useEffect, useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";

const AdminPreview = () => {
  useAuthRedirect();
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/admin/admins`);

        setAdminData(response.data);
        console.log(adminData);
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
    fetchAdmins();
  }, []);

  const handleUpdateRole = async (id, newRole) => {
    try {
      const response = await axios.patch(
        `http://localhost:3500/admin/updateAdmin`,
        {
          id,
          role: newRole,
        }
      );

      setAdminData((prevData) =>
        prevData.map((admin) =>
          admin._id === id ? { ...admin, role: newRole } : admin
        )
      );
      console.log(response.data); // Log the response data for debugging
      setMessage("Admin role updated successfully");
    } catch (error) {
      setMessage("Failed to update admin role");
      console.error("Error updating admin role:", error);
    }
  };

  const removeUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/admin/${id}`);
      setAdminData(adminData.filter((admin) => admin._id !== id));
      setMessage("Admin deleted successfully");
    } catch (error) {
      setMessage("Failed to delete admin");
      console.error("Error deleting admin:", error);
    }
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

  const filteredData = adminData.filter(
    (admin) =>
      admin.fullname.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

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
        <UserTable
          data={filteredData}
          onDelete={confirmDelete}
          onUpdateRole={handleUpdateRole}
        />
      </div>
    </div>
  );
};

export default AdminPreview;
