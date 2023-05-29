/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: "",
  error: "",
};

const currentUserSlice = createSlice({
  name: "currentuser",
  initialState,
  reducers: {
    currentUserSuccess: (state, { payload }) => {
      console.log("Payload", payload);
      state.success = payload;
      state.error = "";
    },
    currentUserFail: (state, { payload }) => {
      state.success = "";
      state.error = payload;
    },
  },
});

export const { currentUserSuccess, currentUserFail } = currentUserSlice.actions;

export default currentUserSlice.reducer;
