/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: "",
  error: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerSuccess: (state, { payload }) => {
      state.success = payload;
      state.error = "";
    },
    registerFail: (state, { payload }) => {
      state.success = "";
      state.error = payload;
    },
  },
});

export const { registerSuccess, registerFail } = registerSlice.actions;

export default registerSlice.reducer;
