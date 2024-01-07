import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startup: [],
};

const startupSlice = createSlice({
  name: "startup",
  initialState,
  reducers: {
    startup: (state, { payload }) => {
      state.startup = payload;
    },
  },
});

export const { startup } = startupSlice.actions;

export default startupSlice.reducer;
