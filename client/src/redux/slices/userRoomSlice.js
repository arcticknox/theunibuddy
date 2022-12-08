import { createSlice } from '@reduxjs/toolkit';


export const userRoomSlice = createSlice({
  name: 'userRoom',
  initialState: {
    userRoom: {},
    userInfo: {},
    userRoomId: {},
  },
  reducers: {
    setUserRoom: {
      reducer: (state, action) => {
        state.userRoom = action.payload.userRoom;
      },
    },
    setUserRoomId: {
      reducer: (state, action) => {
        state.userRoomId = action.payload.userRoom;
      },
    },
    setUserInfo: {
      reducer: (state, action) => {
        state.userInfo = action.payload.data;
      },
    },
  },
});

export const { setUserRoom, setUserInfo, setUserRoomId } = userRoomSlice.actions;

export default userRoomSlice.reducer;
