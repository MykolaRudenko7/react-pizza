import { createSlice } from '@reduxjs/toolkit';

// state
const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
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
      state.sortType = action.payload.sortProp;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryIndex = Number(action.payload.categoryIndex);
    },
  },
});

export const filterSelector = (state) => state.filter;
export const sortTypeSelector = (state) => state.filter.sortType;
export const { setCategoryIndex, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
