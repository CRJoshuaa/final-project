import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socketInit: io("https://tranquil-dawn-08836.herokuapp.com"),
  },

  reducers: {
    // getSocket: (state, action) => {
    //   return state.socketInit;
    // },
  },
});

// export const { enterRoom } = appSlice.actions;

export const selectSocket = (state) => state.socket.socketInit;

export default socketSlice.reducer;
