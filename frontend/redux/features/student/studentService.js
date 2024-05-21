import axios from "axios";

const BACKEND_URL = import.meta.env.BACKEND_URL;
export const API_URL = `http://localhost:3500/api/students/`;

const addStudent = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Get user profile
const getStudent = async () => {
  const response = await axios.get(API_URL + "getRoom");
  return response.data;
};

const updateStudent = async (userData) => {
  const response = await axios.patch(API_URL + "updateRoom", userData);
  return response.data;
};

const getStudents = async () => {
  const response = await axios.get(API_URL + "getRooms");

  return response.data;
};
// Delete User
const deleteStudent = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

const studentService = {
  addStudent,
  getStudent,
  updateStudent,
  getStudents,
  deleteStudent,
};


export default studentService