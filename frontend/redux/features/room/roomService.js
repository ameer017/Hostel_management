import axios from "axios";

export const API_URL = `http://localhost:3500/room/`;

const addRoom = async (roomData) => {
  const response = await axios.post(API_URL + "create-room", roomData);
  return response.data;
};

const getRoom = async () => {
  const response = await axios.get(API_URL + "get-single-room");
  return response.data;
};

const updateRoom = async (roomData) => {
  try {
    const response = await axios.patch(`${API_URL}update-room/${roomData.id}`, roomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getRooms = async () => {
  const response = await axios.get(API_URL + "get-all-room");

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
