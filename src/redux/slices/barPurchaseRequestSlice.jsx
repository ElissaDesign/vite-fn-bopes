/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
};

const barPurchaseRequestSlice = createSlice({
  name: "barpurchaserequest",
  initialState,
  reducers: {
    getBarPurchaseRequest: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { getBarPurchaseRequest } = barPurchaseRequestSlice.actions;

export default barPurchaseRequestSlice.reducer;
