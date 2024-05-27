const express = require("express");
const {
  registerStudent,
  getAllStudents,
  getStudent,
  updateStudentProfile,
  changeStudentRoom,
  updateCheckInStatus,
  deleteStudent,
} = require("../controllers/studentController");

const studentRouter = express.Router(); // Call the function to create a router instance

studentRouter.post("/registerStudent", registerStudent);
studentRouter.get("/", getAllStudents);
studentRouter.get("/:_id", getStudent);
studentRouter.patch("/:_id", updateStudentProfile);
studentRouter.post("/changeRoom", changeStudentRoom);
studentRouter.post("/checkInStatus", updateCheckInStatus);
studentRouter.delete("/delete-student/:_id", deleteStudent);

module.exports = studentRouter;
