import React from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";

const UpdateStudentProfile = ({ setIsOpen }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Dialog</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStudentProfile;
