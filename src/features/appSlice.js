import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    socket: io("https://tranquil-dawn-08836.herokuapp.com"),
  },

  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;
export const selectSocket = (state) => state.app.socket;

export default appSlice.reducer;
