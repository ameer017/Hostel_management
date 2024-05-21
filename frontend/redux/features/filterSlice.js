import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredAdmins: [],
  filteredStudents: [],
  filteredRooms: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_ADMIN(state, action) {
      const { admins, search } = action.payload;

      if (!Array.isArray(admins) || typeof search !== "string") {
        console.error("Invalid payload:", action.payload);
        return;
      }

      const lowerCaseSearch = search.toLowerCase();

      const tempAdmins = admins.filter(
        (admin) =>
          admin.name.toLowerCase().includes(lowerCaseSearch) ||
          admin.email.toLowerCase().includes(lowerCaseSearch)
      );

      state.filteredAdmins = tempAdmins;
    },
    FILTER_ROOM(state, action) {
      const { rooms, search } = action.payload;

      if (!Array.isArray(rooms) || typeof search !== "string") {
        console.error("Invalid payload:", action.payload);
        return;
      }

      const lowerCaseSearch = search.toLowerCase();

      const tempRooms = rooms.filter(
        (room) =>
          room.capacity.toLowerCase().includes(lowerCaseSearch) ||
          room.status.toLowerCase().includes(lowerCaseSearch)
      );

      state.filteredRooms = tempRooms;
    },
    FILTER_STUDENTS(state, action) {
      const { students, search } = action.payload;

      if (!Array.isArray(students) || typeof search !== "string") {
        console.error("Invalid payload:", action.payload);
        return;
      }

      const lowerCaseSearch = search.toLowerCase();

      const tempStudents = students.filter(
        (student) =>
          student.name.toLowerCase().includes(lowerCaseSearch) ||
          student.gender.toLowerCase().includes(lowerCaseSearch)
      );

      state.filteredStudents = tempStudents;
    },
  },
});

export const { FILTER_ADMIN, FILTER_ROOM, FILTER_STUDENTS } =
  filterSlice.actions;

export const selectAdmins = (state) => state.filter.filteredAdmins;
export const selectRooms = (state) => state.filter.filteredRooms;
export const selectStudents = (state) => state.filter.filteredStudents;

export default filterSlice.reducer;
