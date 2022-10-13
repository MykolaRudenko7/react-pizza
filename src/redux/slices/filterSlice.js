import { createSlice } from '@reduxjs/toolkit';

// state
const initialState = {
  categoryIndex: 0,
  sortType: {
    name: 'популярності',
    sortProp: 'rating',
  },
};

// slice
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  //  працівники
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});

// експортую властивість константою
export const { setCategoryIndex, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
