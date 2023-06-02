/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  success: "",
  error: "",
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    getUsersSuccess: (state, { payload }) => {
      state.success = true;
      state.data = payload;
    },
    getUsersFail: (state, { payload }) => {
      state.success = false;
      state.error = payload;
    },
  },
});

export const { getUsersSuccess, getUsersFail } = UsersSlice.actions;

export default UsersSlice.reducer;
