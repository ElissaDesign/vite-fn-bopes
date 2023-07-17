/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    getCustomers: (state, { payload }) => {
      state.data = payload;
    },
    getCustomersFail: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { getCustomers, getCustomersFail } = customersSlice.actions;

export default customersSlice.reducer;
