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
    removeUserFromRoom: {
      reducer: (state, action) => {
        state.userRoom = state.userRoom
            .filter((item) => {
              console.log('itemmm', item);
              item.members[0][1] !== action.payload;
            });
      },
    },
  },
});

export const { setUserRoom, setUserInfo, setUserRoomId, removeUserFromRoom } = userRoomSlice.actions;

export default userRoomSlice.reducer;
