import { createSlice } from '@reduxjs/toolkit';

export const inviteSlice = createSlice({
  name: 'invite',
  initialState: {
    receivedList: [],
    sentList: [],
  },
  reducers: {
    setReceivedList: {
      reducer: (state, action) => {
        state.receivedList = action.payload;
      },
    },
    resetReceivedList: {
      reducer: (state, action ) => {
        state.receivedList = [];
      },
    },
    setSentList: {
      reducer: (state, action) => {
        state.sentList = action.payload;
      },
    },
    removeFromReceivedList: {
      reducer: (state, action) => {
        state.receivedList = state.receivedList
            .filter((item) => item._id !== action.payload);
      },
    },
    removeFromSentList: {
      reducer: (state, action) => {
        state.sentList = state.sentList
            .filter((item) => item._id !== action.payload);
      },
    },
  },
});

export const { setReceivedList, setSentList,
  removeFromReceivedList, removeFromSentList,
  resetReceivedList } = inviteSlice.actions;

export default inviteSlice.reducer;
