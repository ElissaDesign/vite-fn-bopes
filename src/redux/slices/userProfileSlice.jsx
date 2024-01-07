/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    getProfile: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export const { getProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
