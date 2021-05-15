import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    sideBar: false,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    showSideBar: (state, action) => {
      state.sideBar = action.payload.sideBar;
    },
  },
});

export const { enterRoom } = appSlice.actions;
export const selectSideBar = (state) => state.app.sideBar;
export const { showSideBar } = appSlice.actions;
export const selectRoomId = (state) => state.app.roomId;

export default appSlice.reducer;
