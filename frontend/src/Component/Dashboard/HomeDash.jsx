import { useContext, useEffect, useState } from "react";
import "./HomeDash.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import useAuthRedirect from "../../../context/useAuth";
import axios  from "axios"

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const HomeDash = () => {
  useAuthRedirect();
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);


  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get("http://localhost:3500/students/")

      setData(response.data)
      // console.log(response.data)
      const checkedInStudents = response.data.filter(student => student.checkedIn);
        setCheckedInCount(checkedInStudents.length);

      const checkedOutStudents = response.data.filter(student => !student.checkedIn);
        setCheckedOutCount(checkedOutStudents.length);
    }
    fetchStudents()
  })

  return (
    <div className="--flex-center __homeDashCon">
      <div className="__paraCon">
        <h1 className="__paraHeader">Hi {shortenText(user.fullname, 8)}</h1>
      </div>

      <div className="__secondCon">
        <h3 className="__quickTitle">Quick Stats</h3>
        <div className="__flex __boardss">
          <div className="__board">
            <p className="__boardHead">
              {data.length}
            </p>
            <p className="__boardDetails">Total students</p>
          </div>
          <div className="__board">
            <p className="__boardHead">
              {checkedInCount}
            </p>
            <p className="__boardDetails">Active students</p>
          </div>
          <div className="__board">
            <p className="__boardHead">
              {checkedOutCount}
            </p>
            <p className="__boardDetails">Inactive students</p>
          </div>
        </div>
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
