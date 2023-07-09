/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
};

const barPurchaseRequestSlice = createSlice({
  name: "barPurchaseRequest",
  initialState,
  reducers: {
    barPurchaseRequest: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { barPurchaseRequest } = barPurchaseRequestSlice.actions;

export default barPurchaseRequestSlice.reducer;
