import { createSlice } from '@reduxjs/toolkit';

// state
const initialState = {
  currentPage: 1,
};

// slice
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  //  працівники
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

// експортую властивість константою
export const { setCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
