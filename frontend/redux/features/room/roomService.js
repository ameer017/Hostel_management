import axios from "axios";

const BACKEND_URL = import.meta.env.BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/room/`;

const addRoom = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

const getRoom = async () => {
  const response = await axios.get(API_URL + "getRoom");
  return response.data;
};

const updateRoom = async (userData) => {
  const response = await axios.patch(API_URL + "updateRoom", userData);
  return response.data;
};

const getRooms = async () => {
  const response = await axios.get(API_URL + "getRooms");

  return response.data;
};

const deleteRoom = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

const roomService = {
  addRoom,
  getRoom,
  updateRoom,

  getRooms,
  deleteRoom,
};

export default roomService;
