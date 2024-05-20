import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const dashboardLinks = [
  { title: "Home", url: "/homedash" },
  { title: "Students", url: "/studentdash" },
  { title: "Rooms", url: "/room" },
  { title: "Reports", url: "/report" },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };  

  return (
<<<<<<< HEAD
    <aside className=" --flex-start">
=======
    <div className=" --flex-start ml">
>>>>>>> 355d77ebaff37ef3575df58abd74d7f66bdd3038
      <div className="left">
        {dashboardLinks.map(({ title, url }, index) => (
          <div className="--flex-center  --dir-column" key={index}>
            <Link
              to={url}
              // className={index === activeIndex ? "active-link" : ""}
              onClick={() => handleLinkClick(index)}
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;


