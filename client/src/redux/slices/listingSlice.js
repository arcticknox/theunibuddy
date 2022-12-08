import { createSlice } from '@reduxjs/toolkit';

export const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    usersList: [],
  },
  reducers: {
    setUsersList: {
      reducer: (state, action) => {
        state.usersList = action.payload;
      },
    },

  },
});

export const { setUsersList } = listingSlice.actions;

export default listingSlice.reducer;
