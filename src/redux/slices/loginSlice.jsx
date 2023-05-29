/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: "",
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.success = payload;
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.success = "";
      state.error = payload;
    },
  },
});

export const { loginSuccess, loginFail } = loginSlice.actions;

export default loginSlice.reducer;
