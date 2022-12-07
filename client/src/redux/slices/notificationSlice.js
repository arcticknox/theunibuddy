import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationList: [],
  },
  reducers: {
    setNotificationList: {
      reducer: (state, action) => {
        state.notificationList.push(action.payload);
      },
    },
    resetNotificationList: {
      reducer: (state, action ) => {
        state.notificationList = [];
      },
    },
  },
});

export const { setNotificationList, resetNotificationList,
} = notificationSlice.actions;

export default notificationSlice.reducer;
