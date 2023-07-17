/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
};

const barProductsSlice = createSlice({
  name: "barproducts",
  initialState,
  reducers: {
    getBarProducts: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { getBarProducts } = barProductsSlice.actions;

export default barProductsSlice.reducer;
