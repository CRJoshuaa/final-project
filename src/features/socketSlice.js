import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

export const appSlice = createSlice({
  name: "socket",
  initialState: {
    socketInit: io("https://tranquil-dawn-08836.herokuapp.com"),
  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
