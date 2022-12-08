import { createSlice } from '@reduxjs/toolkit';


export const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    users: {},
  },
  reducers: {
    setAllListings: {
      reducer: (state, action) => {
        state.users = action.payload.listingData;
      },
    },
  },
});

export const { setAllListings } = listingSlice.actions;

export default listingSlice.reducer;
