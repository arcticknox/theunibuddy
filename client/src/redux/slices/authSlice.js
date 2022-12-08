import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {},
    isLoggedIn: false,
    accessToken: {},
    refreshToken: {},
  },
  reducers: {
    setAuthInfo: {
      reducer: (state, action) => {
        state.userInfo = action.payload.user;
        state.accessToken = action.payload.tokens.access;
        state.refreshToken = action.payload.tokens.refresh;
      },
    },
    setUserInfo: {
      reducer: (state, action) => {
        state.userInfo = action.payload;
      },
    },
    setIsLoggedIn: {
      reducer: (state, action) => {
        if (state.accessToken && state.userInfo) state.isLoggedIn = true;
        else state.isLoggedIn = false;
      },
    },
    logoutUser: {
      reducer: (state, action) => {
        state.userInfo = {};
        state.isLoggedIn = false;
        state.accessToken = {};
        state.refreshToken = {};
      },
    },
  },
});

export const {
  setAuthInfo,
  setUserInfo,
  setIsLoggedIn,
  logoutUser } = authSlice.actions;

export default authSlice.reducer;
