import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
//
//
//
export enum SortPropEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type SortType = {
  name: string;
  sortProp: SortPropEnum;
};

export interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  categoryIndex: number;
  sortType: SortType;
}

// state
const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryIndex: 0,
  sortType: {
    name: 'популярності',
    sortProp: SortPropEnum.RATING_DESC,
  },
};

// slice
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  //  працівники
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.categoryIndex = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryIndex = Number(action.payload.categoryIndex);
        state.sortType = action.payload.sortType;
      } else {
        state.currentPage = 1;
        state.categoryIndex = 0;
        state.sortType = {
          name: 'популярності',
          sortProp: SortPropEnum.RATING_DESC,
        };
      }
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const sortTypeSelector = (state: RootState) => state.filter.sortType;
export const { setCategoryIndex, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
