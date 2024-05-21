import React, { useEffect, useLayoutEffect, useState } from "react";
import "./HomeDash.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CALC_ACTIVE_STUDENT } from "../../../redux/features/student/studentSlice";
import { getUser } from "../../../redux/features/auth-admin/adminSlice";
import StudentStatus from "../AdminPreview/StudentStatus";

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const HomeDash = () => {
  const dispatch = useDispatch();
  const { students, activeStudent } = useSelector((state) => state.student);

  const { admin } = useSelector((state) => state.admin);
  const initialState = {
    name: admin?.name || "",
    email: admin?.email || "",
  };
  const [dashboard, setDashboard] = useState(initialState);

  const totalStudent = Array.isArray(students) ? students.length : 0;

  // Ensure activeStudent is an array before accessing length
  const activeStudentCount = Array.isArray(activeStudent)
    ? activeStudent.length
    : 0;

  // Calculate inactive students
  const inActive = totalStudent - activeStudentCount;

  useEffect(() => {
    dispatch(getUser());
  }, dispatch);

  useEffect(
    () => {
      dispatch(CALC_ACTIVE_STUDENT());
    },
    dispatch,
    students
  );

  useLayoutEffect(() => {
    if (admin) {
      setDashboard({
        ...dashboard,
        name: admin.name,
        email: admin.email,
      });
    }
  }, [admin]);
  return (
    <div className="--flex-center __homeDashCon">
      <div className="__paraCon">
        {admin && (
          <h1 className="__paraHeader">
            Welcome back, {dashboard?.name || John}!
          </h1>
        )}
      </div>

      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>
        <div className="__flex __boardss">
          <div className="__board">
            <p className="__boardHead">{totalStudent}</p>
            <p className="__boardDetails">Total students</p>
          </div>
          <div className="__board">
            <p className="__boardHead">{activeStudentCount}</p>
            <p className="__boardDetails">Active students</p>
          </div>
          <div className="__board">
            <p className="__boardHead">{inActive}</p>
            <p className="__boardDetails">Inactive students</p>
          </div>
        </div>
      </div>

      <div className="--flex-center  __firstCon">
        <StudentStatus students={students} />
      </div>

      <div className="__lastCon">
        <h3 className="__lastTitle">Quick Actions</h3>
        <div className="__homeBtn">
          <button className="__addBtn">
            <Link to="/studentreg">Add student</Link>
          </button>
          <button className="__attendBtn">
            <Link to="/attendance">Attendance</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
