/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
};

const requestsSlice = createSlice({
  name: "Requests",
  initialState,
  reducers: {
    getRequests: (state, { payload }) => {
      state.data = payload;
    },
    getRequestsFail: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { getRequests, getRequestsFail } = requestsSlice.actions;

export default requestsSlice.reducer;
