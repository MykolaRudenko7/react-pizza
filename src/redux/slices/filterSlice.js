import { createSlice } from '@reduxjs/toolkit';

// state
const initialState = {
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sortType = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryIndex = Number(action.payload.categoryIndex);
    },
  },
});

// експортую властивість константою
export const { setCategoryIndex, setSortType, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
