import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/auth-admin/adminSlice";
import roomReducer from "./features/room/roomSlice";
import studentReducer from "./features/student/studentSlice";
import filterReducer from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    room: roomReducer,
    student: studentReducer,
    filter: filterReducer,
  },
});
