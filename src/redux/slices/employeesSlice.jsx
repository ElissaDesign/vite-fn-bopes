/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getEmployees: (state, { payload }) => {
      state.data = payload;
    },
    getEmployeesFail: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { getEmployees, getEmployeesFail } = employeesSlice.actions;

export default employeesSlice.reducer;
