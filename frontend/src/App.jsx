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
import Loader from "./Component/Loader/Loader";

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(()=> {
      setLoading(false)
    }, 3000)
  }, [])

  const renderRoute =() => (
 
    
    <Routes>
      
      <Route path="/" element={<AdminReg />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/studentreg" element=
      {
        <Layout>
      <StudentReg />

      </Layout>
      } />
      <Route path="/room" element={<Room />} />
      <Route
        path="/homedash"
        element={
           <Layout>
            <HomeDash />
           </Layout>
        }
      />

      <Route path="/adminsPrev" element={<AdminPreview />} />
      <Route path="/attendance" element={
     
      <Layout>
      <Attendance />
      </Layout>
      } />

      <Route path="/studentdash" element={<StudentDashboard />} />
    </Routes>

    
   );

  return <>{loading ? <Loader/> : renderRoute()}</>
}

export default App;
