import React from "react";
import "./Modal.css"
import { RiCloseLine } from "react-icons/ri";

const ChangeStudentRoom = ({ setIsOpen }) => {
    return (
        <div className="darkBG" onClick={() => setIsOpen(false)} />
      )
};

export default ChangeStudentRoom;