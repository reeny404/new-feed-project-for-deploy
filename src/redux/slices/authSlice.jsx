// src/redux/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signedInUser: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.signedInUser = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
