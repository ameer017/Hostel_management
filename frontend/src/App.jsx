import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeDash from "./Component/Dashboard/HomeDash";
import StudentReg from "./Component/Register/StudentReg";
import AdminReg from "./Component/Register/AdminReg";
import Layout from "./Component/Layout/Layout";

import AdminPreview from "./Component/AdminPreview/AdminPreview";

import Attendance from "./Component/Attendance/Attendance";

import StudentDashboard from "./Component/Dashboard/StudentDashboard";
import Login from "./Component/Register/Login";
import Room from "./Component/Dashboard/Room";


function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminReg />} />
      <Route path="/login" element={<Login />} />
      <Route path="/studentreg" element={<StudentReg />} />
      <Route path="/room" element={<Room />} />
      <Route
        path="/homedash"
        element={
          <Layout>
            <HomeDash />
          </Layout>
        }
      />

       <Route path="/adminsPrev" element={< AdminPreview />} />
       <Route path="/attendance" element={<Attendance />} />


      <Route path="/studentdash" element={<StudentDashboard />} />

      <Route path="/adminsPrev" element={<AdminPreview />} />
    </Routes>
  );
}

export default App;
