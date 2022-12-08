import { createSlice } from '@reduxjs/toolkit';

export const blogSlice = createSlice({
  name: 'blogListing',
  initialState: {
    blogList: [],
  },
  reducers: {
    setBlogList: {
      reducer: (state, action) => {
        state.blogList = action.payload;
      },
    },

  },
});

export const { setBlogList } = blogSlice.actions;

export default blogSlice.reducer;
