import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roomService from "./roomService";
import { toast } from "react-toastify";

const initialState = {
  room: null,
  rooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addRoom = createAsyncThunk(
  "room/addRoom",
  async (roomData, thunkAPI) => {
    try {
      return await roomService.addRoom(roomData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRoom = createAsyncThunk(
  "room/getRoom",
  async (_, thunkAPI) => {
    try {
      return await roomService.getRoom();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRooms = createAsyncThunk(
  "room/getRooms",
  async (_, thunkAPI) => {
    try {
      return await roomService.getRooms();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (id, thunkAPI) => {
    try {
      return await roomService.deleteRoom(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async (roomData, thunkAPI) => {
    try {
      return await roomService.updateRoom(roomData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.room = action.payload;
        toast.success("Room added Successful");
        console.log(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.room = null;
        toast.error(action.payload);
      })

      .addCase(getRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.room = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.room = action.payload;
        toast.success("Room Updated");
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET } = roomSlice.actions;

export default roomSlice.reducer;
